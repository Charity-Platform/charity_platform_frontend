import './Blog.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; 
import { FaHome, FaEnvelope, FaFacebook,FaPhone, FaUser, FaLock } from 'react-icons/fa';

const Blog_nav = () => {
  return (
    <Navbar bg="light" expand="lg" dir="rtl" className='navbar-blog' >
    <Navbar.Brand className="ml-auto">
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggel-blog' />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/" exact activeClassName="active">
          <Button className='button-blog '>الرئيسية <i className='p-2 m-2'>{<FaHome />}</i></Button>
        </Nav.Link>
        {/* <Nav.Link as={NavLink} to="/about">
          <Button className='button-blog'>من نحن <i className='p-2'>{<FaEnvelope />}</i></Button>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/services">
          <Button className='button-blog'>الاستشارات <i className='p-2'>{<FaEnvelope />}</i></Button>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/instructors">
          <Button className='button-blog'>المستشارين <i className='p-2'>{<FaEnvelope />}</i></Button>
        </Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Blog_nav
