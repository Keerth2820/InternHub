# InternHub - Internship Finder Portal

InternHub is a modern, full-stack web application designed to connect students and recent graduates with internship opportunities. It features a clean, responsive user interface and a robust backend, providing a seamless experience for both job seekers and company recruiters.

This project was developed as a comprehensive practice application to demonstrate proficiency in modern web development technologies, including role-based authentication, advanced search/filtering, and a complete RESTful API architecture.

---

## ✨ Features

*   **Dual User Roles:** Separate registration and dashboard experiences for **Students** and **Companies**.
*   **Secure Authentication:** Powered by **Firebase** for secure email/password and social logins. Passwords are never stored on our server.
*   **Advanced Internship Search:** A powerful search page with dynamic filters for:
    *   Domain (e.g., Software Development, Marketing)
    *   Location Type (Remote, On-site, Hybrid)
    *   City or Country
    *   GPS-based "Use my location" feature.
*   **Dynamic Sorting:** Sort internship results by Most Recent, Highest Stipend, or Application Deadline.
*   **Student Dashboard:** View applied and saved internships in a centralized hub.
*   **Company Tools:** Companies can post new internship listings and manage their applicants.
*   **Responsive Design:** Fully responsive layout for a great experience on both desktop and mobile devices.

---

## 🚀 Tech Stack

This project is built with a modern, separated frontend and backend architecture.

#### **Frontend:**

*   **Framework:** [React](https://react.dev/) 18 with [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

#### **Backend:**

*   **Framework:** [Python](https://www.python.org/) with [Flask](https://flask.palletsprojects.com/)
*   **Database:** [SQLite](https://www.sqlite.org/) (for development)
*   **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
*   **Authentication:** [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
*   **CORS Handling:** `Flask-Cors`

---

## 🛠️ Setup and Installation

To run this project locally, you will need to set up both the frontend and backend services.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [Python](https://www.python.org/downloads/) (v3.8 or higher)
*   A [Firebase](https://firebase.google.com/) project set up with Authentication enabled.

### 1. Backend Setup

First, set up the Python server which will handle our API and database.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/internhub.git
cd internhub/Backend

# 2. Create and activate a virtual environment
python -m venv venv
# On Windows:
# venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# 3. Install the required Python packages
pip install -r requirements.txt

# 4. Set up Firebase Admin
#    - Go to your Firebase project settings > Service accounts.
#    - Click "Generate new private key" to download a JSON file.
#    - Rename this file to `serviceAccountKey.json` and place it in this `Backend` directory.
#    - IMPORTANT: Add `serviceAccountKey.json` to your .gitignore file to keep it private.

# 5. Run the backend server
#    This will also create the `internhub.db` file automatically.
python app.py
