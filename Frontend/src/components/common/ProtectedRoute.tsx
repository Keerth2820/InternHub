import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('student' | 'company')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Optional: Show a full-page loader while checking auth state
    return <div>Loading...</div>; 
  }

  if (!user) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If logged in but role doesn't match, redirect to a safe page (e.g., home)
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // If authenticated and authorized, render the child route
};

export default ProtectedRoute;