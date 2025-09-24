import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/** ProtectedRoute component - redirects to login if user is not authenticated */
function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the protected content
  return children;
}

export default ProtectedRoute;
