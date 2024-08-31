import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import img from '../../assets/2.jpg'
import './DashBoard.css';
import { Link } from 'react-router-dom';

const InstractorDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);


  const instructors = [
    {
      id: 1,
      name: 'Ahmed Ali',
      phone: '123-456-7890',
      email: 'ahmed@example.com',
      address: '123 Street, City',
      field: 'Mathematics',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Fatima Noor',
      phone: '987-654-3210',
      email: 'fatima@example.com',
      address: '456 Avenue, City',
      field: 'Physics',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'zahra soliman',
      phone: '987-654-3210',
      email: 'fatima@example.com',
      address: '456 Avenue, City',
      field: 'Physics',
      image: 'https://via.placeholder.com/150',
    },
    // Add more instructors as needed
  ];

  const handleShow = (instructor) => {
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);



  return (
    <Container fluid dir='rtl'>
      <Row className="mb-4">
      <h1 className='text-center'>صفحة المستشارين</h1>
        <Col md={3} className="d-flex justify-content-between  align-items-center " dir='rtl'>
        <Link to="/dashboard">
        <Button variant="primary" onClick={""}>الصفحة الرئيسية </Button>
        </Link>
        <Link to="/">
        <Button variant="primary" onClick={""}> عرض الموقع </Button>
        </Link>
          
        </Col>
      </Row>

      <Row>
        {instructors.map(instructor => (
          <Col md={4} key={instructor.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={img} />
              <Card.Body>
                <Card.Title>{instructor.name}</Card.Title>
                <Card.Text>Phone: {instructor.phone}</Card.Text>
                <Button variant="primary" onClick={() => handleShow(instructor)}>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedInstructor && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Instructor Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={img} alt={selectedInstructor.name} className="img-fluid mb-3" />
            <p><strong>Name:</strong> {selectedInstructor.name}</p>
            <p><strong>Phone:</strong> {selectedInstructor.phone}</p>
            <p><strong>Email:</strong> {selectedInstructor.email}</p>
            <p><strong>Address:</strong> {selectedInstructor.address}</p>
            <p><strong>Field:</strong> {selectedInstructor.field}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default InstractorDash;
