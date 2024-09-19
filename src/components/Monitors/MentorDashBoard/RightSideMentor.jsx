import { useState } from 'react';
import { Button, Card, Container, Form, Dropdown } from 'react-bootstrap';
import { FaPlusCircle, FaEdit, FaTrash, FaUser, FaList } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RightSideMentor = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Toggle profile update modal
  const handleProfileModalOpen = () => setShowProfileModal(true);
  const handleProfileModalClose = () => setShowProfileModal(false);
  const navigate = useNavigate();

  // Navigate to display all courses page
  const handleViewAllCourses = () => navigate('/all-courses');

  return (
    <Container className="mentor-admin">
      {/* Header with Profile Icon */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-center">Mentor Admin Panel</h1>
        <Dropdown>
          <Dropdown.Toggle variant="link" id="profile-dropdown" className="p-0">
            <FaUser size={30} /> {/* User icon for profile */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfileModalOpen}>Update Profile</Dropdown.Item>
            <Dropdown.Item href="/">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Profile Update Modal */}
      {showProfileModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Profile</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" />
              </Form.Group>
              <Button variant="primary" type="submit">Save Changes</Button>
              <Button variant="secondary" onClick={handleProfileModalClose}>Close</Button>
            </Form>
          </div>
        </div>
      )}

      {/* Home Page Design */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Dashboard Overview</Card.Title>
          <Card.Text>Here you can view your courses, manage your profile, and more.</Card.Text>
          <Button variant="success" className="mb-3" onClick={() => navigate('/CreateCourse')}>
            <FaPlusCircle /> إضافة دورة جديدة 
          </Button>
          <Button variant="info" className="mb-3 ms-3" onClick={handleViewAllCourses}>
            <FaList /> عرض جميع الدورات الخاصة بى 
          </Button>

          {/* Course Cards */}
          <div className="d-flex flex-wrap">
            {/* Example course card */}
            {/* <Card className="course-card me-3 mb-3" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Course Title 1</Card.Title>
                <Card.Text>Course description goes here.</Card.Text>
                <Button variant="warning" className="me-2"><FaEdit /> Edit</Button>
                <Button variant="danger"><FaTrash /> Delete</Button>
              </Card.Body>
            </Card> */}
            {/* Additional Course Cards */}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RightSideMentor;
