# backend/routes.py
from flask import jsonify, request

# A dummy list of internships matching your TS interface
DUMMY_INTERNSHIPS = [
    {
        "id": "1",
        "title": "Frontend Developer Intern (from API!)",
        "company": { "id": "c1", "name": "TechCorp Inc.", "logo": "/path/to/logo.png" },
        "industry": "Software",
        "description": "Work with our amazing team on a real product.",
        "skills": ["React", "TypeScript", "Flask"],
        "domain": "Software Development",
        "location": { "type": "remote" },
        "duration": "3 Months",
        "stipend": { "amount": 2500, "currency": "$", "period": "monthly" },
        "applicationDeadline": "2025-12-31T23:59:59Z",
        "startDate": "2026-01-15T00:00:00Z",
        "isActive": True,
        "applicationsCount": 42,
        "createdAt": "2025-06-10T12:00:00Z",
        "updatedAt": "2025-06-10T12:00:00Z"
    },
    # ...add more dummy internships
]

def register_routes(app, db):
    # GET all internships
    @app.route('/api/internships', methods=['GET'])
    def get_internships():
        # Later, you will fetch this from a database
        return jsonify(DUMMY_INTERNSHIPS)

    # GET a single internship by ID
    @app.route('/api/internships/<string:internship_id>', methods=['GET'])
    def get_internship(internship_id):
        internship = next((i for i in DUMMY_INTERNSHIPS if i["id"] == internship_id), None)
        if internship:
            return jsonify(internship)
        return jsonify({"error": "Internship not found"}), 404

    # Add more routes here later (POST, PUT, DELETE)
