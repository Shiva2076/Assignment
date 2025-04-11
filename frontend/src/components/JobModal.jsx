import React from 'react';
import { Modal } from 'react-bootstrap';
import JobForm from './JobForm.jsx'; 

const JobModal = ({ show, onHide, onSubmit, job }) => {
  const handleSubmit = (formData) => {
    onSubmit(formData);
    onHide();
  };

  const title = job ? 'Edit Job Application' : 'Add New Job Application';

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JobForm onSubmit={handleSubmit} initialData={job} />
      </Modal.Body>
    </Modal>
  );
};

export default JobModal;