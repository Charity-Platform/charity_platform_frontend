import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import './DashBoard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomeDash = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [AllUsersCount, setAllUsersCount] = useState(0);

  const [message, setmessage] = useState(0);


  const navigate = useNavigate();

  // Fetch user data to calculate the total number of users
  useEffect(() => {
    // Get the number of all users
    axios.get(`${import.meta.env.VITE_MAIN_URL}users`, { withCredentials: true })
      .then((response) => {
        if (response.data.message === 'Documents retrieved successfully') {
          setUsersCount(response.data.results); 
        }
      })
      .catch((error) => console.log(error));

    // Get the number of active mentors
    axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`, { withCredentials: true })
      .then((response) => {
        if (response.data.message === 'Active mentors retrieved successfully') {
          setMentorCount(response.data.length);
        }
      })
      .catch((error) => console.log(error));

       // Get the number of message  from websuite
    axios.get(`${import.meta.env.VITE_MAIN_URL}contact-us`, { withCredentials: true })
    .then((response) => {
      if (response.data.message === 'Documents retrieved successfully') {
        setmessage(response.data.length); 
      }
    })
    .catch((error) => console.log(error));

    axios.get(`${import.meta.env.VITE_MAIN_URL}counter`, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        setAllUsersCount(response.data.count);
      }
    })
    .catch((error) => console.log(error));

  }, []);

  return (
    <Container fluid className="dashboard p-4">
      <h2 className="mb-4">لوحة التحكم</h2>
      <Row>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-info text-white">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>{usersCount}</h3> {/* Displaying the total users count here */}
                  <p>إجمالي المستخدمين</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="light" className="mt-3" onClick={() => navigate('/alluser')}>
                المزيد من المعلومات <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-success text-white">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>{message}</h3>
                  <p> استفسارات المستخدمين</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="light" className="mt-3" onClick={() => navigate('/ContactDash')}>
                المزيد من المعلومات <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-warning text-dark">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>{mentorCount}</h3> {/* Displaying the total number of active mentors */}
                  <p>المستشارين النشيطين حاليا  </p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="dark" className="mt-3">
                المزيد من المعلومات <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-danger text-white">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>{AllUsersCount}</h3>
                  <p> عدد زوار الموقع</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="light" className="mt-3">
                المزيد من المعلومات <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Add more components like charts and tables here */}
    </Container>
  );
};

export default HomeDash;
