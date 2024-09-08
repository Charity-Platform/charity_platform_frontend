import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
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
    <>
      <Navbar expand="lg" className="bg-body-tertiary Nav" dir="rtl">
        <Container>
          <Navbar.Brand href="#home" className="logo">
            <img src={logo} alt="logo" className="img" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="p-2 toggle"
          />
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
                  <Link to="/profile">
                    <FaUserCircle className="fs-1 avatar text-light" />
                  </Link>
                </div>
                <div>
                  <button onClick={handelLogout} className="logout-btn fs-5">
                    خروج
                  </button>
                </div>
              </>
            ) : (
              <div className="d-flex text-light login-buttons">
                <Link to={'/login'}>
                  <button
                    type="button"
                    className="mx-1 btn btn-primary bg-dark:hover"
                  >
                    سجل دخول
                  </button>
                </Link>
                <button
                  type="button"
                  className="mx-1 btn btn-primary"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                >
                  انشاء حساب
                </button>
              </div>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Modal for Signup Options */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                مرحباً بكم في منصة المرشد الخيرى
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ margin: 'initial' }}
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-end">
                يسعدنا انضمامك إلى منصتنا التي تهدف إلى تمكين الأفراد والمؤسسات
                من خلال تقديم خدمات استشارية وتدريبية عالية الجودة في مجالات
                الكوتشينج، وذكاءات الأعمال، وغيرها من التخصصات حال توفرها.
              </p>
              <div
                className="d-flex flex-row"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                <Link
                  to={'/instractor'}
                  className="card mx-2"
                  style={{ width: '18rem' }}
                >
                  <img
                    src={
                      'https://t3.ftcdn.net/jpg/02/94/21/42/360_F_294214205_ZmptWrtSwORSWadAIHSWqwSa319XlQiB.jpg'
                    }
                    className="card-img-top"
                    alt={'تسجيل الدخول كمستشار'}
                  />
                  <div className="card-body">
                    <p className="card-text">تسجيل كمستشار</p>
                  </div>
                </Link>
                <Link
                  to={'/login'}
                  className="card mx-2"
                  style={{ width: '18rem' }}
                >
                  <img
                    src={
                      'https://media.istockphoto.com/id/1336832660/photo/male-teenage-student-in-yellow-background-stock-photo.jpg?s=612x612&w=0&k=20&c=24LklaK0hoPbe7bGCSHZPbaWJKV6yH0F1b8lABbOS30='
                    }
                    className="card-img-top"
                    alt={'تسجيل الدخول كمستخدم'}
                  />
                  <div className="card-body">
                    <p className="card-text">تسجيل كمستخدم</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
