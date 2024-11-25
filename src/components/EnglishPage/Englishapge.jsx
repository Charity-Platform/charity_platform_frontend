import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import videos from "../../assets/background.mp4";
import img1 from "../../assets/EnglishBG3.jpg";
import img2 from "../../assets/code3.jpg";
import img3 from "../../assets/service.jpg";
import img4 from "../../assets/services/التدريب والتطوير.jpg";
import img5 from "../../assets/EnglishBG.jpg";
import "./EnglishPage.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const servicesData = [
  {
    title: "Feasibility Studies Preparation",
    text: "Comprehensive support to prepare and develop feasibility studies for charity projects that align with donor requirements.",
    image: img1,
  },
  {
    title: "Project Reporting",
    text: "Provide periodic and final project reports according to donor standards to enhance credibility and funding continuity.",
    image: img2,
  },
  {
    title: "Grant Application Support",
    text: "Assistance in preparing and submitting grant requests, including guidance on proposal writing and follow-ups.",
    image: img3,
  },
  {
    title: "Registration on Arab Grant Platforms",
    text: "Offering registration services and guidance on how to use Arab grant platforms to access available support opportunities.",
    image: img4,
  },
  {
    title: "Resource Development Consulting",
    text: "Providing advice on the best methods for resource development in humanitarian projects and enhancing their sustainability by connecting with donors and marketing the projects.",
    image: img5,
  },
];

const EnglishPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNextButtonClick = () => {
    navigate('/ContactEnglish')
  };
  const handelHomePage =()=>{
    navigate('/');
  }

  return (
    <div className="english-page">
      <Button variant="primary"  className="w-5" onClick={()=>handelHomePage()}>
              Home Page
       </Button>
      <section className="header-slider">
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} showDots>
          <img src={img1} alt="Header 1" className="slider-image" />
          <img src={img4} alt="Header 2" className="slider-image" />
          <img src={img5} alt="Header 3" className="slider-image" />
        </Carousel>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <Container>
          <h2 className="section-title">About Us</h2>
          <Row>
            <Col md={6}>
              <p className="text-aboutus">
                Esteshara Platform offers you support and guidance to develop your projects and attract funding for your humanitarian and charitable initiatives. We empower you to reach donors and funding platforms in the Arab world.
              </p>
            </Col>
            <Col md={6}>
              <div className="video-container">
                <video className="img-fluid" autoPlay muted loop>
                  <source src={videos} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <Container>
          <h2 className="section-title">Our Premium Services</h2>
          <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} showDots>
            {servicesData.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.image} alt={service.title} className="img-fluid service-img" />
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-text">{service.text}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <Container>
          <h2 className="section-title">Why Choose Us?</h2>
          <Row>
            <Col md={6}>
              <ul className="why-choose-list">
                <li>Deep Understanding of Donor Culture and Standards</li>
                <li>Quick and Direct Access to Arab Donor Networks</li>
                <li>Specialized and Targeted Consultation</li>
                <li>Comprehensive Support from Concept to Execution</li>
              </ul>
            </Col>
            <Col md={6}>
              <img src={img3} alt="Why Choose Us" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <Container>
          <h2 className="section-title">Key Benefits</h2>
          <Row>
            {[
              "Facilitating the submission of your projects in a professional format that aligns with the culture and requirements of donors.",
              "Enabling direct access to donor platforms and suitable funding opportunities.",
              "Enhancing the credibility of your projects and increasing the chances of continuous funding through well-prepared reports.",
              "Growing your resources and achieving sustainability for your charitable initiatives.",
            ].map((benefit, index) => (
              <Col md={3} key={index}>
                <div className="benefit-card">
                  <p>{benefit}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h3 className="footer-title">
                Let Us Help You Bring Your Project to Life in the Arab World.
              </h3>
              <p className="footer-description">
                Connect with us today to start your journey and achieve success in your charitable initiatives.
              </p>
              <Link onClick={()=>handleShowModal()}>
                <Button variant="primary" className="contact-btn">
                  Contact Us
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>
            <p>Connect with us on WhatsApp:</p>
            <a
              href="https://wa.me/201126989864" // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <FaWhatsapp size={40} color="#25D366" />
            </a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNextButtonClick}>
            Contact with form 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EnglishPage;
