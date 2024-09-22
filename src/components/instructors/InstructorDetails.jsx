import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaClock } from 'react-icons/fa';
import './MainInstructor.css'; 
import { useParams } from 'react-router-dom';

const InstructorDetails = () => {
  const [mentor, setMentor] = useState(null);
  const [sessionType, setSessionType] = useState('online');
  const [price, setPrice] = useState(0);
  const { id } = useParams();

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

    fetchMentorData();
  }, [id]);

  const handleSessionTypeChange = (type) => {
    setSessionType(type);
    setPrice(type === 'online' ? onlinePrice : offlinePrice);
  };

  if (!mentor) return <div>Loading...</div>;

  return (
    <div className="instructor-details-container">
      <Card className="mentor-card shadow mb-4">
        <Card.Img variant="top" src={mentor.image} alt={mentor.name} className="mentor-image" />
        <Card.Body className="text-center">
          <Card.Title className="mentor-name">{mentor.name}</Card.Title>
          <Card.Text>Email: {mentor.email}</Card.Text>
          <Card.Text>Phone: {mentor.phone}</Card.Text>
          <Card.Text>Field: {mentor.field}</Card.Text>
          <Card.Text>Address: {mentor.address}</Card.Text>
          <Card.Text className="instruction-time">
            <FaClock className="time-icon" /> Instruction Time: 1 hour
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="price-section text-center">
        <h3>Book a Session</h3>
        <div className="session-type-buttons mb-3">
          <Button
            variant={sessionType === 'online' ? 'primary' : 'outline-secondary'}
            onClick={() => handleSessionTypeChange('online')}
            className="me-2 session-button"
          >
            Online
          </Button>
          <Button
            variant={sessionType === 'offline' ? 'primary' : 'outline-secondary'}
            onClick={() => handleSessionTypeChange('offline')}
            className="session-button"
          >
            Offline
          </Button>
        </div>
        <div className="price-display">
          <h4>Price: ${price}</h4>
          <p>Session Type: {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)}</p>
          <Button variant="success" className="order-button" onClick={() => alert('Session booked!')}>
            Order Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
