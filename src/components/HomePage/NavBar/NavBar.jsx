import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary Nav" dir="rtl">
        <Container>
          <Navbar.Brand href="#home" className='p-3'>Charity-Blatform</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto m-2 p-2 navbar">
              <Nav.Link as={NavLink} to="/" exact activeClassName="active">الرئيسية</Nav.Link>
              <Nav.Link as={NavLink} to="/about">من نحن</Nav.Link>
              <Nav.Link as={NavLink} to="/services">الاستشارات</Nav.Link>
              <Nav.Link as={NavLink} to="/instructors">المستشارين</Nav.Link>
              <Nav.Link as={NavLink} to="#">مبادرة واعى</Nav.Link>
              <Nav.Link as={NavLink} to="#">المكتبة الخيرية</Nav.Link>
              <Nav.Link as={NavLink} to="#">تواصل معنا</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className='icon-user'>
            <i className="fa-solid fa-user"> حسابى</i>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
