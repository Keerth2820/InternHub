from flask import jsonify, request
from firebase_admin import auth
from models import db, User, Internship, StudentProfile, SavedInternship, Application 
import datetime

# --- Helper Function to Verify Firebase Token ---
def verify_token(request):
    """Helper function to verify Firebase ID token and return (uid, error_tuple)."""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None, (jsonify({"error": "Authorization header is missing or invalid"}), 401)
    
    try:
        id_token = auth_header.split('Bearer ')[1]
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token['uid'], None
    except Exception as e:
        return None, (jsonify({"error": f"Token verification failed: {e}"}), 403)

# --- Main Route Registration Function ---
def register_routes(app, db):

    # --- User and Profile Endpoints ---
    @app.route('/api/users', methods=['POST'])
    def create_user():
        uid, error = verify_token(request)
        if error: return error
        data = request.get_json()
        if not data or not all(k in data for k in ['name', 'email', 'role']):
            return jsonify({"error": "Missing required fields"}), 400
        if User.query.get(uid):
            return jsonify({"message": "User already exists"}), 200
        
        new_user = User(id=uid, email=data['email'], name=data['name'], role=data['role'])
        db.session.add(new_user)
        if data['role'] == 'student':
            new_profile = StudentProfile(user_id=uid)
            db.session.add(new_profile)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201

    @app.route('/api/me/profile', methods=['GET', 'PUT'])
    def user_profile():
        uid, error = verify_token(request)
        if error: return error

        user = User.query.get(uid)
        if not user:
            return jsonify({"error": "User not found in database"}), 404
        
        # This endpoint is primarily for students
        if user.role != 'student':
             # For company users, just return their basic info for now
             return jsonify({"name": user.name, "email": user.email, "role": user.role})

        # Find or create the student's profile to avoid errors
        student_profile = StudentProfile.query.filter_by(user_id=uid).first()
        if not student_profile:
            student_profile = StudentProfile(user_id=uid)
            db.session.add(student_profile)
            db.session.commit()

        if request.method == 'GET':
            return jsonify({
                "name": user.name,
                "email": user.email,
                "university": student_profile.university or '',
                "bio": student_profile.bio or '',
                "skills": student_profile.skills or '',
            })

        if request.method == 'PUT':
            data = request.get_json()
            if not data: return jsonify({"error": "No data provided"}), 400

            if 'name' in data and data['name'] and data['name'] != user.name:
                user.name = data['name']
                # Update Firebase displayName to keep things in sync
                try:
                    auth.update_user(uid, display_name=f"{data['name']}_{user.role}")
                except Exception as e:
                    print(f"Warning: Could not update Firebase display name: {e}")

            if student_profile:
                if 'university' in data: student_profile.university = data['university']
                if 'bio' in data: student_profile.bio = data['bio']
                if 'skills' in data: student_profile.skills = data['skills']
            
            db.session.commit()
            return jsonify({"message": "Profile updated successfully"})

    # --- Internship Endpoints ---
    @app.route('/api/internships', methods=['GET'])
    def get_internships():
        all_internships = Internship.query.order_by(Internship.created_at.desc()).all()
        return jsonify([i.to_dict() for i in all_internships])

    @app.route('/api/internships', methods=['POST'])
    def post_internship():
        uid, error = verify_token(request)
        if error: return error
        user = User.query.get(uid)
        if not user or user.role != 'company':
            return jsonify({"error": "Forbidden: Only company accounts can post internships."}), 403
        data = request.get_json()
        try:
            deadline = datetime.datetime.strptime(data['applicationDeadline'], '%Y-%m-%d')
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid date format for applicationDeadline. Use YYYY-MM-DD."}), 400
        
        new_internship = Internship(
            title=data.get('title'), description=data.get('description'), domain=data.get('domain'),
            company_name=user.name, company_id=uid, location_type=data.get('locationType'),
            city=data.get('city'), country=data.get('country'), duration=data.get('duration'),
            stipend_amount=int(data['stipendAmount']) if data.get('stipendAmount') else None,
            application_deadline=deadline
        )
        db.session.add(new_internship)
        db.session.commit()
        return jsonify(new_internship.to_dict()), 201
    
    @app.route('/api/internships/<int:internship_id>', methods=['GET'])
    def get_internship(internship_id):
        internship = Internship.query.get(internship_id)
        if internship: return jsonify(internship.to_dict())
        return jsonify({"error": "Internship not found"}), 404

    # --- Saved Internship Endpoints ---
    @app.route('/api/me/saved', methods=['GET'])
    def get_saved_internships():
        uid, error = verify_token(request)
        if error: return error
        saved_relations = SavedInternship.query.filter_by(student_id=uid).all()
        saved_ids = [s.internship_id for s in saved_relations]
        if not saved_ids: return jsonify([])
        internships = Internship.query.filter(Internship.id.in_(saved_ids)).all()
        return jsonify([i.to_dict() for i in internships])

    @app.route('/api/internships/<int:internship_id>/save', methods=['POST'])
    def save_internship(internship_id):
        uid, error = verify_token(request)
        if error: return error
        if not Internship.query.get(internship_id): return jsonify({"error": "Internship not found"}), 404
        if SavedInternship.query.filter_by(student_id=uid, internship_id=internship_id).first():
            return jsonify({"message": "Already saved"}), 200
        new_save = SavedInternship(student_id=uid, internship_id=internship_id)
        db.session.add(new_save)
        db.session.commit()
        return jsonify({"message": "Saved successfully"}), 201

    @app.route('/api/internships/<int:internship_id>/save', methods=['DELETE'])
    def unsave_internship(internship_id):
        uid, error = verify_token(request)
        if error: return error
        save_to_delete = SavedInternship.query.filter_by(student_id=uid, internship_id=internship_id).first()
        if not save_to_delete: return jsonify({"error": "Not found"}), 404
        db.session.delete(save_to_delete)
        db.session.commit()
        return jsonify({"message": "Unsaved successfully"}), 200
