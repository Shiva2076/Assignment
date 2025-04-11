import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import JobCard from './JobCard.jsx'; 

const JobList = ({ jobs, onStatusChange, onEdit, onDelete, loading, error }) => {
  if (loading) {
    return <Alert variant="info">Loading job applications...</Alert>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (jobs.length === 0) {
    return (
      <Alert variant="secondary">
        No job applications found. Start by adding a new application!
      </Alert>
    );
  }

  return (
    <Row>
      {jobs.map(job => (
        <Col key={job._id} xs={12} md={6} lg={4}>
          <JobCard
            job={job}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  );
};

export default JobList;