import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaUserCircle } from "react-icons/fa";
import logo from '../../../assets/logo.png';
import './Nav.css';
import { useAuth } from '../../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();
  const { setRole, setuser, setLoggedin, user } = useAuth();

  const handelLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      setuser(undefined);
      setLoggedin(false);
      setRole(undefined);
      navigate('/');
    } catch (error) {
      console.log(error.response);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary Nav" dir="rtl">
      <Container>
        <Navbar.Brand href="#home" className="logo">
          <img src={logo} alt="logo" className="img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="p-2 toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-2 p-2 navbar">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              الرئيسية
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              من نحن
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services">
              الاستشارات
            </Nav.Link>
            <Nav.Link as={NavLink} to="/instructors">
              المستشارين
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Cources">
              مبادرة واعى
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books">
              المكتبة الخيرية
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog">
              مدونة الخير
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              تواصل معنا
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="icon-user">
          {user ? (
            <>
            <div>
               <Link to='/profile'>
                <FaUserCircle className="fs-1 avatar text-light"/>
                
              </Link>
            </div>
             <div>
              <button onClick={handelLogout} className="logout-btn  fs-5">
                خروج
              </button>
             </div>
              
            </>
          ) : (
            <div className="d-flex text-light login-buttons">
              <Link to={'/login'}>
                <button
                  type="button"
                  className="mx-2 btn btn-primary bg-dark:hover"
                >
                  سجل دخول
                </button>
              </Link>
              <button
                type="button"
                className="mx-2 btn btn-primary"
                data-bs-toggle="modal"
                href="#exampleModalToggle"
                role="button"
              >
                انشاء حساب
              </button>
            </div>
          )}
        </div>
        {/* Modal code here */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
