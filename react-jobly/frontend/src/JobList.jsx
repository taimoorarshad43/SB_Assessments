import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';

/** JobList component - displays all jobs with search functionality */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load jobs on component mount
  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const jobsData = await JoblyApi.getJobs();
        setJobs(jobsData);
        setError(null);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm === '') {
        // If search is empty, load all jobs
        try {
          const jobsData = await JoblyApi.getJobs();
          setJobs(jobsData);
        } catch (err) {
          console.error('Error loading jobs:', err);
          setError('Failed to load jobs. Please try again.');
        }
      } else {
        // Search with the current term
        try {
          const jobsData = await JoblyApi.getJobs({ title: searchTerm });
          setJobs(jobsData);
        } catch (err) {
          console.error('Error searching jobs:', err);
          setError('Failed to search jobs. Please try again.');
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
          <p className="mt-2">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Jobs</h2>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
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

      {jobs.length === 0 && !loading && (
        <div className="alert alert-info mt-3">
          {searchTerm ? 'No jobs found matching your search.' : 'No jobs available.'}
        </div>
      )}

      <div className="mt-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
