import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './Nav.css';

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername('');
    window.location.href = "/"; // إعادة توجيه المستخدم بعد تسجيل الخروج
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary Nav" dir="rtl">
      <Container>
        <Navbar.Brand href="#home" className='logo'>
          <img src={logo} alt='logo' className='img' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='p-2 toggle' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-2 p-2 navbar">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">الرئيسية</Nav.Link>
            <Nav.Link as={NavLink} to="/about">من نحن</Nav.Link>
            <Nav.Link as={NavLink} to="/services">الاستشارات</Nav.Link>
            <Nav.Link as={NavLink} to="/instructors">المستشارين</Nav.Link>
            <Nav.Link as={NavLink} to="/Cources">مبادرة واعى</Nav.Link>
            <Nav.Link as={NavLink} to="/books">المكتبة الخيرية</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">مدونة الخير</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">تواصل معنا</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className='icon-user'>
          {username ? (
           <div className="dropdown">
           <button 
             className="btn btn-secondary dropdown-toggle" 
             type="button" 
             id="dropdownMenuButton" 
             data-bs-toggle="dropdown" 
             aria-expanded="false"
           >
             {username}
           </button>
           <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             <li><Link className="dropdown-item" to="/" onClick={handleLogout}>تسجيل الخروج</Link></li>
           </ul>
         </div>
          ) : (
            <Link to="/login">
              <i className="fa-solid fa-user"> حسابى</i>
            </Link>  
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
