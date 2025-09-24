import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';

/** CompanyList component - displays all companies with search functionality */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load companies on component mount
  useEffect(() => {
    async function loadCompanies() {
      try {
        setLoading(true);
        const companiesData = await JoblyApi.getCompanies();
        setCompanies(companiesData);
        setError(null);
      } catch (err) {
        console.error('Error loading companies:', err);
        setError('Failed to load companies. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadCompanies();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm === '') {
        // If search is empty, load all companies
        try {
          const companiesData = await JoblyApi.getCompanies();
          setCompanies(companiesData);
        } catch (err) {
          console.error('Error loading companies:', err);
          setError('Failed to load companies. Please try again.');
        }
      } else {
        // Search with the current term
        try {
          const companiesData = await JoblyApi.getCompanies({ name: searchTerm });
          setCompanies(companiesData);
        } catch (err) {
          console.error('Error searching companies:', err);
          setError('Failed to search companies. Please try again.');
        }
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Companies</h2>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {companies.length === 0 && !loading && (
        <div className="alert alert-info mt-3">
          {searchTerm ? 'No companies found matching your search.' : 'No companies available.'}
        </div>
      )}

      <div className="mt-4">
        {companies.map(company => (
          <CompanyCard key={company.handle} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
