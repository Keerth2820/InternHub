from flask import Flask
from flask_cors import CORS # Make sure this is imported
from flask_sqlalchemy import SQLAlchemy
import firebase_admin
from firebase_admin import credentials
from routes import register_routes

# Initialize extensions
db = SQLAlchemy()

# Initialize Firebase Admin
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Create the Flask app instance
app = Flask(__name__)

# --- THIS IS THE CRUCIAL PART THAT FIXES THE ERROR ---
# This line tells the backend to accept requests from your frontend.
# It will automatically handle the "preflight" OPTIONS requests.
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///internhub.db"
db.init_app(app)

# Register the API routes and pass the database instance
register_routes(app, db)

if __name__ == '__main__':
    with app.app_context():
        # This will create the database tables if they don't exist
        db.create_all()
    # Run the app
    app.run(debug=True)
