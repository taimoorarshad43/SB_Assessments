import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

/** JobCard component - displays individual job info in a card format */
function JobCard({ job }) {
  const { id, title, salary, equity, companyName, companyHandle } = job;
  const { currentUser, applyToJob, hasAppliedToJob } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(hasAppliedToJob(id));

  // Update applied state when hasAppliedToJob changes
  useEffect(() => {
    setApplied(hasAppliedToJob(id));
  }, [hasAppliedToJob, id]);

  const handleApply = async () => {
    if (applied) return;
    
    setApplying(true);
    try {
      const result = await applyToJob(id);
      if (result.success) {
        setApplied(true);
      } else {
        console.error('Application failed:', result.errors);
        // You could show an error message here
      }
    } catch (err) {
      console.error('Application error:', err);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h6 className="card-title">{title}</h6>
            {companyName && companyHandle ? (
              <p className="card-text text-muted mb-1">
                <Link 
                  to={`/companies/${companyHandle}`} 
                  className="text-decoration-none"
                >
                  {companyName}
                </Link>
              </p>
            ) : companyName ? (
              <p className="card-text text-muted mb-1">{companyName}</p>
            ) : null}
            <div className="d-flex gap-3 flex-wrap">
              {salary && (
                <small className="text-muted">
                  <strong>Salary:</strong> ${salary.toLocaleString()}
                </small>
              )}
              {equity && (
                <small className="text-muted">
                  <strong>Equity:</strong> {(equity * 100).toFixed(1)}%
                </small>
              )}
              {(!salary && !equity) && (
                <small className="text-muted">
                  <em>Salary and equity information not available</em>
                </small>
              )}
            </div>
          </div>
          <div className="col-md-4 text-end">
            {currentUser ? (
              <button 
                className={`btn btn-sm ${applied ? 'btn-success' : 'btn-primary'}`}
                onClick={handleApply}
                disabled={applying || applied}
              >
                {applying ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Applying...
                  </>
                ) : applied ? (
                  'Applied ✓'
                ) : (
                  'Apply'
                )}
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" disabled>
                Apply
              </button>
            )}
            {!currentUser && (
              <small className="d-block text-muted mt-1">
                Login required
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
