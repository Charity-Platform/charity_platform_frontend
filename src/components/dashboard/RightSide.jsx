
import { Link, useNavigate } from 'react-router-dom'
import './DashBoard.css';
import { FaHome, FaUsers  } from 'react-icons/fa';
import { IoIosContacts } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const RightSide = () => {
  const { setRole, setuser, setLoggedin } = useAuth();
  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      setuser(undefined);
      setLoggedin(false);
      setRole(undefined);
      navigate('/');
    } catch (error) {
      console.log(error.response);
      console.log('Logout failed. Please try again.', error);
    }
  };

  return (
    <div className="sidebar p-3">
    <h4>Admin Page</h4>
    <div className="btn-group-vertical" dir='rtl'>
        <div className="mb-3 ">
          <img src="https://t3.ftcdn.net/jpg/02/94/62/14/360_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg" className="img-thumbnail" alt="User" />
          <h5 className='text-dashboard-title'>MR : Ali Helal</h5>
        </div>
        <button className="btn-outside  d-flex align-items-center mb-1" aria-label="Logout" onClick={handelLogout}>
      <CiLogout/>
      </button>
      <button className="btn-website btn  d-flex align-items-center mb-1">
      <Link to='/' className='btn-title'>
         <TbWorldWww className='me-2' /> الذهاب للموقع
        </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center mb-1">
        <Link to='/dashboard' className='btn-title'>
         <FaHome className='me-2' /> الرئيسية
        </Link>
       
      </button>
      <button className="btn-comunity btn  d-flex align-items-center mb-1">
      <Link to='/alluser' className='btn-title'>
        {/* <FaBriefcase className='me-1' />  */}
        كل المستخدمين
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/blogsDash' className='btn-title'>
        <FaUsers className='me-2' /> المدونة
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/noneactive' className='btn-title'>
        {/* <FaUsers className='me-2' /> */}
         مستشارين لم يتم قبولهم
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/activemonitor' className='btn-title'>
        {/* <FaUsers className='me-2' /> */}
        المستشارين المقبولين
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/ContactDash' className='btn-title'>
        <IoIosContacts  className='mr-2' />
         تواصل معنا
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/createcourses' className='btn-title'>
        {/* <IoIosContacts  className='me-2' /> */}
          إضافة كورسات 
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/allCourses' className='btn-title'>
        {/* <IoIosContacts  className='me-2' /> */}
          عرض كل الدورات 
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/ContactDash' className='btn-title'>
        {/* <IoIosContacts  className='me-2' />  */}
        الاستشارات 
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='/questions' className='btn-title'>
        {/* <IoIosContacts  className='me-2' />  */}
        الأسئلة 
      </Link>
      </button>
   
    </div>
    
  </div>
  )
}

export default RightSide
