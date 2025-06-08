from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes import register_routes

# Initialize SQLAlchemy
db = SQLAlchemy()

app = Flask(__name__)
# Configure the database URI for SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///internhub.db"

# Link the app with SQLAlchemy
db.init_app(app)

# CORS allows your React app to talk to your Flask app
CORS(app)

# Register all the routes from routes.py
register_routes(app, db) # Pass 'db' to your routes

if __name__ == '__main__':
    with app.app_context():
        # This will create the database file and tables if they don't exist
        db.create_all()
    app.run(debug=True)