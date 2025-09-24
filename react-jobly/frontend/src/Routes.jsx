import React from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

// Import components
import Homepage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';
import ProtectedRoute from './ProtectedRoute';

/** Routes component - defines all application routes */
function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      
      {/* Protected routes - require authentication */}
      <Route 
        path="/companies" 
        element={
          <ProtectedRoute>
            <CompanyList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/companies/:handle" 
        element={
          <ProtectedRoute>
            <CompanyDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs" 
        element={
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfileForm />
          </ProtectedRoute>
        } 
      />
    </ReactRouterRoutes>
  );
}

export default Routes;
