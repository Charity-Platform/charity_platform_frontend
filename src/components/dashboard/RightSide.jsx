
import { Link } from 'react-router-dom'
import './DashBoard.css';
import { FaBriefcase, FaHome, FaUsers  } from 'react-icons/fa';
import { IoIosContacts } from "react-icons/io";

const RightSide = () => {
  return (
    <div className="sidebar p-3">
    <h4>Admin Page</h4>
    <div className="btn-group-vertical">
        <div className="mb-5 ">
          <img src="https://t3.ftcdn.net/jpg/02/94/62/14/360_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg" className="img-thumbnail" alt="User" />
          <h5 className='text-dashboard-title'>MR : Ali Helal</h5>
        </div>
      <button className="btn-comunity btn  d-flex align-items-center mb-2">
        <Link to='/dashboard' className='btn-title'>
         <FaHome className='me-2' /> الرئيسية
        </Link>
       
      </button>
      <button className="btn-comunity btn  d-flex align-items-center mb-2">
      <Link to='/alluser' className='btn-title'>
        <FaBriefcase className='me-2' /> كل المستخدمين
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/blogsDash' className='btn-title'>
        <FaUsers className='me-2' /> المدونة
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/instructordash' className='btn-title'>
        <FaUsers className='me-2' /> المستشارين
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/ContactDash' className='btn-title'>
        <IoIosContacts  className='me-2' /> تواصل معنا
      </Link>
      </button>
    </div>
  </div>
  )
}

export default RightSide
