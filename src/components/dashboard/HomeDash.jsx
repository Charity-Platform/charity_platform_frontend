import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import './DashBoard.css';

const HomeDash = () => {
  return (
    <Container fluid className="dashboard p-4">
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-info text-white">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="light" className="mt-3">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-success text-white">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>53%</h3>
                  <p>Bounce Rate</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="light" className="mt-3">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-warning text-dark">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="dark" className="mt-3">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6} className="mb-4">
          <Card className="small-box bg-danger text-white">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <FaInfoCircle size={50} />
              </div>
              <Button variant="light" className="mt-3">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Add more components like charts and tables here */}
    </Container>
  );
}

export default HomeDash;
