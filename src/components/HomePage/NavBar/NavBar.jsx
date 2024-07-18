import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import Login from '../../LoginAndRegister/Login';
import './Nav.css';

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary Nav" dir="rtl">
        <Container>
          <Navbar.Brand href="#home" className='logo'>
            <img src={logo} alt='logo' className='img' />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='p-2  toggle'/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" m-2 p-2 navbar">
              <Nav.Link as={NavLink} to="/" exact activeClassName="active">الرئيسية</Nav.Link>
              <Nav.Link as={NavLink} to="/about">من نحن</Nav.Link>
              <Nav.Link as={NavLink} to="/services">الاستشارات</Nav.Link>
              <Nav.Link as={NavLink} to="/instructors">المستشارين</Nav.Link>
              <Nav.Link as={NavLink} to="/Cources">مبادرة واعى</Nav.Link>
              <Nav.Link as={NavLink} to="/books">المكتبة الخيرية</Nav.Link>
              <Nav.Link as={NavLink} to="/blog"> مدونة الخير </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">تواصل معنا</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className='icon-user'>
            <Link to="/login">
            <i className="fa-solid fa-user"> حسابى</i>
            </Link>           
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
