import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';

/** CompanyDetail component - displays individual company details and jobs */
function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        setLoading(true);
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
        setError(null);
      } catch (err) {
        console.error('Error loading company:', err);
        setError('Failed to load company details. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, [handle]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
        <Link to="/companies" className="btn btn-secondary">
          ← Back to Companies
        </Link>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Company not found.
        </div>
        <Link to="/companies" className="btn btn-secondary">
          ← Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>{company.name}</h2>
          <p className="lead">{company.description}</p>
          
          {company.numEmployees && (
            <p className="text-muted">
              <strong>Employees:</strong> {company.numEmployees.toLocaleString()}
            </p>
          )}
        </div>
        {company.logoUrl && (
          <div className="col-md-4 text-end">
            <img 
              src={company.logoUrl} 
              alt={`${company.name} logo`}
              className="img-fluid"
              style={{ maxHeight: '120px' }}
            />
          </div>
        )}
      </div>

      <div className="mt-4">
        <h4>Jobs at {company.name}</h4>
        {company.jobs && company.jobs.length > 0 ? (
          <div>
            {company.jobs.map(job => (
              <JobCard 
                key={job.id} 
                job={{
                  ...job, 
                  companyName: company.name,
                  companyHandle: company.handle
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            No jobs available at this company.
          </div>
        )}
      </div>

      <div className="mt-4">
        <Link to="/companies" className="btn btn-secondary">
          ← Back to Companies
        </Link>
      </div>
    </div>
  );
}

export default CompanyDetail;
