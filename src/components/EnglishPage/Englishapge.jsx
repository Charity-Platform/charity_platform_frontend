import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import videos from "../../assets/background.mp4";
import img1 from "../../assets/en1.jpeg";
import img2 from "../../assets/code3.jpg";
import img3 from "../../assets/service.jpg";
import img4 from "../../assets/eng3.jpeg";
import img5 from "../../assets/eng2.jpeg";
import "./EnglishPage.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 0 }, items: 1 },
  desktop: { breakpoint: { max: 1024, min: 0 }, items: 1 },
  tablet: { breakpoint: { max: 768, min: 0 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const servicesData = [
  {
    title: "Feasibility Studies for Projects",
    text: "Full support in preparing feasibility studies for charitable projects based on donor requirements. Presenting your projects professionally to ensure support acceptance from donors.",
    image: img1,
  },
  {
    title: "Project Reports Preparation",
    text: "Preparing reports for your projects according to the requirements of donors. Providing professional reports to ensure the continued funding of your projects from the donor organization.",
    image: img2,
  },
  {
    title: "Helping You Submit Funding Requests",
    text: "Assisting you in preparing and sending funding requests for your projects to donor organizations, and following up on them. Preparing funding requests professionally, highlighting your project goals, and increasing the chances of securing funding.",
    image: img3,
  },
  {
    title: "Registration on Arab Support Platforms",
    text: "Registering your organization with Arab donors and accessing available funding opportunities. Enabling you to directly access donor platforms and suitable funding opportunities.",
    image: img4,
  },
  {
    title: "Consultancy to Increase Funding Opportunities",
    text: "We provide consultancy to guide you towards the best ways to secure funding for your projects. Increased funding opportunities for your projects.",
    image: img5,
  },
];

const EnglishPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNextButtonClick = () => {
    navigate('/ContactEnglish');
  };
  const handelHomePage = () => {
    navigate('/');
  };

  return (
    <div className="english-page">
      <Button variant="primary" className="w-5" onClick={() => handelHomePage()}>
        Home Page
      </Button>

      {/* Header with Slider */}
      <section className="header-slider">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          showDots
          itemClass="slider-image-wrapper"
        >
           <img src={img1} alt="Header 1" className="slider-image" />
           <img src={img4} alt="Header 2" className="slider-image" />
          <img src={img5} alt="Header 3" className="slider-image" />
        </Carousel>
      </section>

      {/* Introduction */}
      <section className="introduction-section">
        <Container>
          <h2 className="section-title">Welcome to Esteshara Platform</h2>
          <p className="text-aboutus">
            We are here to assist and support you in developing your charitable projects and getting funding for them.
            We are your strategic partners, helping you reach donors and funding platforms across the Arab world.
          </p>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <Container>
          <h2 className="section-title">Our Services</h2>
          <Row>
            {servicesData.map((service, index) => (
              <Col md={6} lg={4} key={index}>
                <div className="service-card">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="img-fluid service-img"
                  />
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-text">{service.text}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
  <Container>
    <h2 className="section-title">Why Choose Estisharah Platform?</h2>
    <div className="parent-container">
      <ul className="why-choose-list">
        <li>We deeply understand the requirements and standards of donor organizations.</li>
        <li>We provide you with quick and direct access to the networks of donor organizations.</li>
        <li>We have full knowledge of what is required to support your projects in Arab countries.</li>
        <li>Full support for your projects, from idea to implementation.</li>
      </ul>
    </div>
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
              <Button
                variant="primary"
                className="contact-btn"
                onClick={handleShowModal}
              >
                Contact Us
              </Button>
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
              href="https://wa.me/201126989864"
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
