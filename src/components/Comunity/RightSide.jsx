import { FaBriefcase, FaHome, FaUsers} from 'react-icons/fa';
import './Comunity.css';
import { Link } from 'react-router-dom';

const RightSide = () => {
  return (
    <div className="sidebar p-3">
    <h4>Home</h4>
    <div className="btn-group-vertical">
      <button className="btn-comunity btn  d-flex align-items-center mb-2">
        <Link to='/' className='btn-title'>
         <FaHome className='me-2' /> الرئيسية
        </Link>
       
      </button>
      <button className="btn-comunity btn  d-flex align-items-center mb-2">
      <Link to='/jobs' className='btn-title'>
        <FaBriefcase className='me-2' /> الوظائف
      </Link>
      </button>
      <button className="btn-comunity btn  d-flex align-items-center">
      <Link to='' className='btn-title'>
        <FaUsers className='me-2' /> مجتمع الشركات
      </Link>
      </button>
    </div>
  </div>
  );
}

export default RightSide
