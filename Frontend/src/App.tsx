import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTop from './components/common/ScrollToTop';

// Common Components
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import InternshipDetail from './pages/InternshipDetail';
import ApplyFlow from './pages/student/ApplyFlow';
import Companies from './pages/Companies';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfilePage from './pages/student/Profile';
import Applied from './pages/student/Applied';
import Saved from './pages/student/Saved';

// Company Pages
import CompanyDashboard from './pages/company/Dashboard';
import PostInternship from './pages/company/PostInternship';
import EditInternship from './pages/company/EditInternship';
import CompanyListings from './pages/company/Listings';
import CompanyProfile from './pages/company/Profile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
                {/* --- PUBLIC ROUTES --- */}
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/internships/:id" element={<InternshipDetail />} />
                <Route path="/companies" element={<Companies />} />

                {/* --- PROTECTED STUDENT ROUTES --- */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  <Route path="/student/applied" element={<Applied />} />
                  <Route path="/student/saved" element={<Saved />} />
                  <Route path="/student/profile" element={<StudentProfilePage />} />
                  <Route path="/internships/:id/apply" element={<ApplyFlow />} />
                </Route>

                {/* --- PROTECTED COMPANY ROUTES --- */}
                <Route element={<ProtectedRoute allowedRoles={['company']} />}>
                  <Route path="/company/dashboard" element={<CompanyDashboard />} />
                  <Route path="/company/post" element={<PostInternship />} />
                  <Route path="/company/edit/:id" element={<EditInternship />} />
                  <Route path="/company/listings" element={<CompanyListings />} />
                  <Route path="/company/profile" element={<CompanyProfile />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
