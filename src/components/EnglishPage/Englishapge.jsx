import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./EnglishPage.css";
import img1 from "../../assets/11.jpeg";
import img2 from "../../assets/1.jpg";
import img3 from "../../assets/12.jpeg";
import videos from "../../assets/background.mp4";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const servicesData = [
  {
    title: "Feasibility Studies for Projects",
    text: "Comprehensive support to prepare and develop feasibility studies for charity projects that align with donor requirements.",
    image: img1,
  },
  {
    title: "Project Reporting Services",
    text: "Provide periodic and final project reports according to donor standards to enhance credibility and funding continuity.",
    image: img2,
  },
  {
    title: "Grant Application Support",
    text: "Assistance in preparing and submitting grant requests, including guidance on proposal writing and follow-ups.",
    image: img3,
  },
];

const EnglishPage = () => {
  return (
    <div className="english-page">
      {/* Navbar */}
     
<nav className="navbar">
  <Container>
    <ul className="navbar-list">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </Container>
</nav>

      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1>Empowering Projects Across the Arab World</h1>
          <Button variant="light" className="banner-btn">
            Explore Services
          </Button>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section">
        <Container>
          <h2 className="section-title">Our Premium Services</h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={true}
          >
            {servicesData.map((service, index) => (
              <div key={index} className="service-card">
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
                <li>Decades of experience with donor cultures.</li>
                <li>Fast and reliable access to Arab donors.</li>
                <li>Comprehensive consultations tailored to funding.</li>
                <li>Support from ideation to execution.</li>
              </ul>
            </Col>
            <Col md={6}>
              <video className="img-fluid" autoplay muted>
                <source src={videos} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <div className="cta-section">
        <h3>Let's Collaborate on Your Next Big Idea</h3>
        <Button variant="light" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default EnglishPage;
