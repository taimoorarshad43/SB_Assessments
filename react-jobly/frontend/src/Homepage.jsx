import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

/** Homepage component - welcome message that changes based on login state */
function Homepage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
                  <h1 className="display-4 mb-4">
                    {currentUser 
                      ? `Welcome back, ${currentUser.firstName && currentUser.lastName 
                          ? `${currentUser.firstName} ${currentUser.lastName}` 
                          : currentUser.firstName || currentUser.username}!` 
                      : 'Welcome to Jobly!'
                    }
                  </h1>
          <p className="lead">
            {currentUser 
              ? 'Ready to find your next opportunity?' 
              : 'Find your dream job or discover amazing companies.'
            }
          </p>
          <p>
            {currentUser 
              ? 'Browse companies, search for jobs, and apply to positions that interest you.'
              : 'Browse companies, search for jobs, and take the next step in your career.'
            }
          </p>
          
          {!currentUser && (
            <div className="mt-4">
              <Link to="/login" className="btn btn-primary me-3">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline-primary">
                Sign Up
              </Link>
            </div>
          )}
          
          {currentUser && (
            <div className="mt-4">
              <Link to="/companies" className="btn btn-primary me-3">
                Browse Companies
              </Link>
              <Link to="/jobs" className="btn btn-outline-primary">
                Search Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
