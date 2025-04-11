import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const JobForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date(),
    link: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        appliedDate: new Date(initialData.appliedDate)
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      appliedDate: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="company">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter job role"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="appliedDate">
          <Form.Label>Date of Application</Form.Label>
          <DatePicker
            selected={formData.appliedDate}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="yyyy-MM-dd"
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="link">
        <Form.Label>Job Link</Form.Label>
        <Form.Control
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com/job-posting"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {initialData ? 'Update Job' : 'Add Job'}
      </Button>
    </Form>
  );
};

export default JobForm;