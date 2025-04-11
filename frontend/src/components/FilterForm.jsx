import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    status: '',
    startDate: null,
    endDate: null
  });

  const handleStatusChange = (e) => {
    setFilters({
      ...filters,
      status: e.target.value
    });
  };

  const handleStartDateChange = (date) => {
    setFilters({
      ...filters,
      startDate: date
    });
  };

  const handleEndDateChange = (date) => {
    setFilters({
      ...filters,
      endDate: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const filterData = {};
    
    if (filters.status) filterData.status = filters.status;
    if (filters.startDate) filterData.startDate = filters.startDate.toISOString();
    if (filters.endDate) filterData.endDate = filters.endDate.toISOString();
    
    onFilter(filterData);
  };

  const handleReset = () => {
    setFilters({
      status: '',
      startDate: null,
      endDate: null
    });
    
    onFilter({});
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="align-items-end">
        <Col md={3}>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select 
              value={filters.status} 
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group controlId="startDate" >
            <Form.Label>From Date</Form.Label>
            <DatePicker
              selected={filters.startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={filters.startDate}
              endDate={filters.endDate}
              className="form-control"
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group controlId="endDate">
            <Form.Label>To Date</Form.Label>
            <DatePicker
              selected={filters.endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={filters.startDate}
              endDate={filters.endDate}
              minDate={filters.startDate}
              className="form-control"
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Button variant="primary" type="submit" className="me-2">
            Apply Filters
          </Button>
          <Button variant="outline-secondary" type="button" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterForm;