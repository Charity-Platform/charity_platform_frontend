import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Container, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // for navigation
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');
  
  const navigate = useNavigate(); // for navigation

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

  // Handle button click to navigate to different pages
  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <div className="jobs-container">
      {/* Header Section with Buttons */}
      <Container className="jobs-header-buttons">
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8} className="d-flex justify-content-center">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="mb-2">
              <ToggleButton 
                id="tbg-btn-1" 
                variant="outline-primary" 
                value={1}
                onClick={() => handleNavigate('/job-seeker')} // Navigate to Job Seeker page
                className="mx-2" // Adding margin using Bootstrap class
              >
               الوظائف المتاحة
              </ToggleButton>
              <ToggleButton 
                id="tbg-btn-2" 
                variant="outline-primary" 
                value={2}
                onClick={() => handleNavigate('/comunity_platform')} // Navigate to Employer page
                className="mx-2"
              >
                أنا جهة توظيف
              </ToggleButton>
              <ToggleButton 
                id="tbg-btn-3" 
                variant="outline-primary" 
                value={3}
                onClick={() => handleNavigate('/job_form')} // Navigate to Training page
                className="mx-2"
              >
               أنا أبحث عن عمل
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Container>

      {/* Filter input */}
      <Container className="jobs-filter-section">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="ابحث في الوظائف حسب العنوان أو الشركة أو الموقع..."
              value={filterKeyword}
              onChange={handleFilter}
              className="jobs-filter-input"
            />
          </Col>
        </Row>
      </Container>

      {/* Jobs Listing */}
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
