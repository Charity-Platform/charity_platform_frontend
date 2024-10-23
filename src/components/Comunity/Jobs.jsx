import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import './Jobs.css'; // Updated CSS file name

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');

  // Sample job data (replace with an API call if needed)
  useEffect(() => {
    const sampleJobs = [
      { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote' },
      { id: 2, title: 'Backend Developer', company: 'Innovate Solutions', location: 'New York' },
      { id: 3, title: 'UI/UX Designer', company: 'Creative Minds', location: 'San Francisco' },
    ];
    setJobs(sampleJobs);
    setFilteredJobs(sampleJobs);
  }, []);

  // Open modal with selected job
  const handleShow = (job) => {
    setSelectedJob(job);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Handle job filtering
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    setFilterKeyword(keyword);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="jobs-container">
      {/* Background header with overlay */}
      <div className="jobs-header">
        <div className="jobs-header-content">
          <h1 className="text-white">Find Your Dream Job</h1>
          <Form.Control
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={filterKeyword}
            onChange={handleFilter}
            className="jobs-filter-input"
          />
        </div>
      </div>

      <Container>
        <Row>
          {filteredJobs.map((job) => (
            <Col key={job.id} sm={12} md={6} lg={4}>
              <Card className="jobs-card mb-4">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                  <Card.Text>{job.location}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(job)}>
                    Apply
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for job application */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Apply for {selectedJob?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Resume</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit Application
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Jobs;
