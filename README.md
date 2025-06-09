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
*   **Modern UI/UX:** Built with a keen eye for design, featuring smooth animations and a responsive layout for all devices.
*   **Light & Dark Mode:** A user-toggleable theme for comfortable viewing in any lighting condition.

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

## 🛠️ Local Development Setup

To run this project locally, you will need to set up both the backend and frontend services. Follow these steps in order.

### **1. Prerequisites & Initial Setup**

*   Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and [Python](https://www.python.org/downloads/) (v3.8 or higher) installed.
*   Create a new project on [Firebase](https://firebase.google.com/) and enable **Email/Password Authentication** in the "Authentication" -> "Sign-in method" tab.
*   Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/internhub.git
    cd internhub
    ```

### **2. Configure the Backend**

The backend is a Python/Flask server that manages the API and database.

*   Navigate into the backend directory:
    ```bash
    cd backend
    ```
*   Create and activate a Python virtual environment:
    ```bash
    # On Windows:
    python -m venv venv
    venv\Scripts\activate

    # On macOS/Linux:
    python3 -m venv venv
    source venv/bin/activate
    ```
*   Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
*   Generate your Firebase Admin credentials:
    1.  In the Firebase console, go to **Project settings > Service accounts**.
    2.  Click **"Generate new private key"** to download a JSON file.
    3.  Rename this file to `serviceAccountKey.json`.
    4.  Place the renamed file directly inside the `backend` folder.
    5.  **IMPORTANT:** Add `backend/serviceAccountKey.json` to your root `.gitignore` file to keep it private!

### **3. Configure the Frontend**

The frontend is a React application built with Vite.

*   Navigate to the frontend directory from the project root:
    ```bash
    cd ../frontend 
    ```
*   Install the required Node.js packages:
    ```bash
    npm install
    ```
*   Generate your Firebase Frontend configuration:
    1.  In the Firebase console, go to **Project settings > General**.
    2.  Scroll down to "Your apps" and click the web icon (`</>`) to create a new web app (or use an existing one).
    3.  Copy the `firebaseConfig` object.
    4.  In your code editor, create a new file at `frontend/src/firebase.ts`.
    5.  Paste the configuration into the new file like this:

    ```typescript
    // src/firebase.ts
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    // Paste your config object from the Firebase console here
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    ```

### **4. Run the Application**

You need to have both servers running simultaneously in two separate terminals.

*   **Terminal 1 (Backend):**
    ```bash
    # Make sure you are in the `backend` directory with your venv activated
    python app.py
    ```
    *Your backend API will now be running at `http://127.0.0.1:5000`*

*   **Terminal 2 (Frontend):**
    ```bash
    # Make sure you are in the `frontend` directory
    npm run dev
    ```
    *Your frontend website will now be running at `http://localhost:5173`*

You can now open **`http://localhost:5173`** in your browser to use the full application.
