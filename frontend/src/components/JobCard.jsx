import React from 'react';
import { Card, Badge, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FaExternalLinkAlt, FaEllipsisV } from 'react-icons/fa';

const JobCard = ({ job, onStatusChange, onEdit, onDelete }) => {
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Applied':
        return 'primary';
      case 'Interview':
        return 'warning';
      case 'Offer':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title>{job.company}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{job.role}</Card.Subtitle>
            <Badge bg={getBadgeVariant(job.status)} className="mb-2">
              {job.status}
            </Badge>
            <Card.Text className="text-muted mt-2">
              Applied on: {formatDate(job.appliedDate)}
            </Card.Text>
          </div>
          
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${job._id}`}>
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Change Status</Dropdown.Header>
              <Dropdown.Item onClick={() => onStatusChange(job._id, 'Applied')}>
                Applied
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onStatusChange(job._id, 'Interview')}>
                Interview
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onStatusChange(job._id, 'Offer')}>
                Offer
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onStatusChange(job._id, 'Rejected')}>
                Rejected
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => onEdit(job)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(job._id)} className="text-danger">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        {job.link && (
          <div className="mt-2">
            <a 
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-primary"
            >
              View Job <FaExternalLinkAlt size={12} />
            </a>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default JobCard;