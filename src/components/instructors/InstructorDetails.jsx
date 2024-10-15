import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaClock } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import './MainInstructor.css';

const InstructorDetails = () => {
  const [mentor, setMentor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [sessionType, setSessionType] = useState('online');
  const [price, setPrice] = useState(0);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const onlinePrice = 200;
  const offlinePrice = 300;

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${id}`);
        setMentor(response.data.data);
        setPrice(onlinePrice);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      }
    };

    const fetchMentorCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/mentor/${id}`);
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchMentorInstructions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}tickets/mentor/${id}`);
        setInstructions(response.data.data);
      } catch (error) {
        console.error('Error fetching mentor instructions:', error);
      }
    };

    fetchMentorData();
    fetchMentorCourses();
    fetchMentorInstructions();
  }, [id]);

  const handleSessionTypeChange = (type) => {
    setSessionType(type);
    setPrice(type === 'online' ? onlinePrice : offlinePrice);
  };

  const handleShowDetails = (instruction) => {
    setSelectedInstruction(instruction);
  };

  const handleCloseModal = () => {
    setSelectedInstruction(null);
  };

  const handleViewCourseDetails = (id) => {
    navigate(`/CoursesDetails/${id}`); // Navigate to course details page with the course ID
  };

  if (!mentor) return <div>Loading...</div>;

  return (
    <div className="instructor-details-wrapper">
      {/* Mentor Details */}
      <Card className="instructor-info-card shadow mb-4">
        <Card.Img variant="top" src={mentor.image} alt={mentor.name} className="instructor-image" />
        <Card.Body className="text-center">
          <Card.Title className="instructor-name">{mentor.name}</Card.Title>
          {/* <Card.Text>Email: {mentor.email}</Card.Text>
          <Card.Text>Phone: {mentor.phone}</Card.Text> */}
          <Card.Text>Field: {mentor.field}</Card.Text>
          <Card.Text>Address: {mentor.address}</Card.Text>
        </Card.Body>
      </Card>

      {/* Instructions Section */}
      <div className="instructions-section">
        <h3 className="text-center">Instructions for {mentor.name}</h3>
        {instructions.length > 0 ? (
          instructions.map((instruction) => (
            <Card key={instruction.id} className="instruction-card shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="instruction-title">{instruction.title}</Card.Title>
                <Card.Text className="instruction-details">Details: {instruction.description}</Card.Text>
                <Card.Text className="instructor-instruction-time">
                  <FaClock className="instructor-time-icon" /> Duration: {instruction.duration} hours
                </Card.Text>
                <Card.Text className="instruction-details">Price: ${instruction.price}</Card.Text>
                <Button variant="success" className="instructor-order-btn">حجز الاستشارة</Button>
                <Button variant="info" className="ms-2" onClick={() => handleShowDetails(instruction)}>View Details</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center">No instructions available for this mentor.</p>
        )}
      </div>

      {/* Modal for Instruction Details */}
      <Modal 
        show={selectedInstruction !== null} 
        onHide={handleCloseModal}
        dialogClassName="modal-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Instruction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstruction && (
            <div>
              <p><strong>Duration:</strong> {selectedInstruction.duration} minutes</p>
              <p><strong>Start Time:</strong> Invalid Date</p>
              <p><strong>Price:</strong> {selectedInstruction.price} EGP</p>
              <p><strong>Day:</strong> {selectedInstruction.day}</p>
              <p><strong>Type:</strong> {selectedInstruction.type}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Courses Section */}
      <div className="courses-section mt-5">
        <h3 className="text-center">Courses Offered by {mentor.name}</h3>
        <div className="courses-container">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Card key={course.id} className="course-card shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>Duration: {course.duration} hours</Card.Text>
                  <Card.Text>Price: ${course.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleViewCourseDetails(course._id)}>View Details</Button> {/* Updated button */}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No courses available for this mentor.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
