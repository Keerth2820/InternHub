from app import db # Import the 'db' object from your app
import datetime

# --- User & Profile Models ---

class User(db.Model):
    id = db.Column(db.String(50), primary_key=True)  # This will be the Firebase UID
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'student' or 'company'
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class StudentProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    skills = db.Column(db.Text, nullable=True) # Stored as comma-separated string
    bio = db.Column(db.Text, nullable=True)
    university = db.Column(db.String(200), nullable=True)

# --- Internship & Company Models ---

class Internship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    company_name = db.Column(db.String(200), nullable=False)
    company_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    
    location_type = db.Column(db.String(20), nullable=False) # 'remote', 'hybrid', 'onsite'
    city = db.Column(db.String(100), nullable=True)
    country = db.Column(db.String(100), nullable=True)
    
    duration = db.Column(db.String(50), nullable=False)
    stipend_amount = db.Column(db.Integer, nullable=True)
    stipend_currency = db.Column(db.String(5), nullable=True, default='$')

    application_deadline = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Helper to convert object to a dictionary, making it easy to send as JSON
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'domain': self.domain,
            'company': { 'id': self.company_id, 'name': self.company_name },
            'location': { 'type': self.location_type, 'city': self.city, 'country': self.country },
            'duration': self.duration,
            'stipend': {'amount': self.stipend_amount, 'currency': self.stipend_currency} if self.stipend_amount else None,
            'applicationDeadline': self.application_deadline.isoformat(),
            'createdAt': self.created_at.isoformat(),
        }

# --- Join Tables for User Actions ---

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    internship_id = db.Column(db.Integer, db.ForeignKey('internship.id'), nullable=False)
    status = db.Column(db.String(50), default='pending')
    applied_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
class SavedInternship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    internship_id = db.Column(db.Integer, db.ForeignKey('internship.id'), nullable=False)