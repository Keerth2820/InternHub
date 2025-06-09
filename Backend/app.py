from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials

from extensions import db          # Import db from our new extensions file
from routes import register_routes # This is now safe to import

def create_app():
    """Application Factory Function"""
    
    # Initialize Firebase Admin (this check prevents errors on hot-reload)
    if not firebase_admin._apps:
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)

    # Create the Flask app instance
    app = Flask(__name__)

    # Configure CORS to allow requests from your frontend
    # Using "*" is simple and effective for local development
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Configure the database URI
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///internhub.db"
    
    # Connect the db extension (from extensions.py) to our Flask app
    db.init_app(app)

    # Register all the API routes from routes.py
    register_routes(app, db)

    return app

# Create the app instance using the factory
app = create_app()

if __name__ == '__main__':
    # The 'app_context' is needed for database operations
    with app.app_context():
        # This will create database tables if they don't exist
        db.create_all()
    
    # Run the development server
    app.run(debug=True)
