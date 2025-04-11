import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import JobList from './components/JobList.jsx';
import JobModal from './components/JobModal.jsx';
import FilterForm from './components/FilterForm.jsx';

import {
  getJobApplications,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication
} from './services/jobService';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getJobApplications(filters);
        setJobs(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch job applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const showAlertMessage = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 3000);
  };

  const handleAddJob = async (jobData) => {
    try {
      await createJobApplication(jobData);
      const response = await getJobApplications(filters);
      setJobs(response.data);
      
      showAlertMessage('Job application added successfully!');
    } catch (err) {
      setError(err.message || 'Failed to add job application');
      showAlertMessage('Failed to add job application', 'danger');
    }
  };
  const handleUpdateJob = async (jobData) => {
    try {
      await updateJobApplication(selectedJob._id, jobData);
      
      const response = await getJobApplications(filters);
      setJobs(response.data);
      
      showAlertMessage('Job application updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update job application');
      showAlertMessage('Failed to update job application', 'danger');
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await updateJobApplication(jobId, { status: newStatus });
      
      const response = await getJobApplications(filters);
      setJobs(response.data);
      
      showAlertMessage(`Status updated to ${newStatus}`);
    } catch (err) {
      setError(err.message || 'Failed to update status');
      showAlertMessage('Failed to update status', 'danger');
    }
  };
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJobApplication(jobId);
        
        const response = await getJobApplications(filters);
        setJobs(response.data);
        
        showAlertMessage('Job application deleted successfully!');
      } catch (err) {
        setError(err.message || 'Failed to delete job application');
        showAlertMessage('Failed to delete job application', 'danger');
      }
    }
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleOpenAddModal = () => {
    setSelectedJob(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleModalSubmit = (formData) => {
    if (selectedJob) {
      handleUpdateJob(formData);
    } else {
      handleAddJob(formData);
    }
  };

  const handleFilterChange = (filterData) => {
    setFilters(filterData);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Student Job Tracker</h1>
      
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
      
      <Row className="mb-4">
        <Col>
          <FilterForm onFilter={handleFilterChange} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleOpenAddModal}>
            <FaPlus className="me-2" /> Add New Job
          </Button>
        </Col>
      </Row>
      
      <JobList
        jobs={jobs}
        loading={loading}
        error={error}
        onStatusChange={handleStatusChange}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />
      
      <JobModal
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={handleModalSubmit}
        job={selectedJob}
      />
    </Container>
  );
}

export default App;