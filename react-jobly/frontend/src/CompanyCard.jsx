import React from 'react';
import { Link } from 'react-router-dom';

/** CompanyCard component - displays individual company info in a card format */
function CompanyCard({ company }) {
  const { handle, name, description, numEmployees, logoUrl } = company;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h5 className="card-title">
              <Link to={`/companies/${handle}`} className="text-decoration-none">
                {name}
              </Link>
            </h5>
            <p className="card-text">{description}</p>
            {numEmployees && (
              <p className="card-text">
                <small className="text-muted">
                  {numEmployees.toLocaleString()} employees
                </small>
              </p>
            )}
          </div>
          {logoUrl && (
            <div className="col-md-4 text-end">
              <img 
                src={logoUrl} 
                alt={`${name} logo`}
                className="img-fluid"
                style={{ maxHeight: '60px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
