import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import Routes from './Routes';
import AuthContext from './AuthContext';
import JoblyApi from './api';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

/** Main App component with routing and authentication */
function App() {
  const [token, setToken] = useLocalStorage('token', null);
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load user info when token changes
  useEffect(() => {
    async function loadUserInfo() {
      if (token) {
        try {
          // Decode token to get username
          const { username } = jwtDecode(token);
          
          // Set token in API class
          JoblyApi.token = token;
          
          // Get user details
          setLoading(true);
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
          // Applications will be loaded as needed when user applies to jobs
        } catch (err) {
          console.error('Error loading user info:', err);
          // If there's an error, clear the token
          setToken(null);
          setCurrentUser(null);
          JoblyApi.token = null;
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        JoblyApi.token = null;
      }
    }
    loadUserInfo();
  }, [token]);

  /** Login function */
  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData.username, loginData.password);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, errors: err };
    }
  }

  /** Signup function */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.register(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('Signup error:', err);
      return { success: false, errors: err };
    }
  }

  /** Logout function */
  function logout() {
    setToken(null);
    setCurrentUser(null);
    setApplications(new Set());
    JoblyApi.token = null;
  }

  /** Update profile function */
  async function updateProfile(updatedUser) {
    setCurrentUser(updatedUser);
  }

  /** Apply to a job */
  async function applyToJob(jobId) {
    if (!currentUser) return { success: false, errors: ['Must be logged in to apply'] };
    
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setApplications(prev => new Set([...prev, jobId]));
      return { success: true };
    } catch (err) {
      console.error('Application error:', err);
      return { success: false, errors: err };
    }
  }

  /** Check if user has applied to a job */
  function hasAppliedToJob(jobId) {
    return applications.has(jobId);
  }

  const authValue = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    applyToJob,
    hasAppliedToJob,
    loading
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        <div className="App">
          <Navbar />
          <main>
            <Routes />
          </main>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
