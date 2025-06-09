from flask import jsonify, request
from firebase_admin import auth
from models import db, User, Internship, SavedInternship, Application 
import datetime

# --- Helper Function to Verify Firebase Token ---
def verify_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None, (jsonify({"error": "Authorization header is missing or invalid"}), 401)
    
    try:
        id_token = auth_header.split('Bearer ')[1]
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token['uid'], None
    except Exception as e:
        return None, (jsonify({"error": f"Token verification failed: {e}"}), 403)

# --- Main Route Registration ---
def register_routes(app, db):

    # --- User Endpoint ---
    @app.route('/api/users', methods=['POST'])
    def create_user():
        uid, error = verify_token(request)
        if error: return error

        data = request.get_json()
        if not data or not all(k in data for k in ['name', 'email', 'role']):
            return jsonify({"error": "Missing required fields"}), 400

        existing_user = User.query.get(uid)
        if existing_user:
            return jsonify({"message": "User already exists", "user_id": existing_user.id}), 200
        
        new_user = User(id=uid, email=data['email'], name=data['name'], role=data['role'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully", "user_id": new_user.id}), 201

    @app.route('/api/me/profile', methods=['GET', 'PUT'])
    def user_profile():
        uid, error = verify_token(request)
        if error: return error
        user = User.query.get(uid)
        if not user: return jsonify({"error": "User not found"}), 404
        if request.method == 'GET':
            return jsonify({"name": user.name, "email": user.email, "role": user.role})
        if request.method == 'PUT':
            data = request.get_json()
            if 'name' in data:
                user.name = data['name']
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
            return jsonify({"error": "Forbidden"}), 403
        data = request.get_json()
        try:
            deadline = datetime.datetime.strptime(data['applicationDeadline'], '%Y-%m-%d')
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid date format for applicationDeadline"}), 400
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
        saved = SavedInternship.query.filter_by(student_id=uid).all()
        ids = [s.internship_id for s in saved]
        if not ids: return jsonify([])
        internships = Internship.query.filter(Internship.id.in_(ids)).all()
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
        return jsonify({"message": "Saved"}), 201

    @app.route('/api/internships/<int:internship_id>/save', methods=['DELETE'])
    def unsave_internship(internship_id):
        uid, error = verify_token(request)
        if error: return error
        save_to_delete = SavedInternship.query.filter_by(student_id=uid, internship_id=internship_id).first()
        if not save_to_delete: return jsonify({"error": "Not found"}), 404
        db.session.delete(save_to_delete)
        db.session.commit()
        return jsonify({"message": "Unsaved"}), 200
