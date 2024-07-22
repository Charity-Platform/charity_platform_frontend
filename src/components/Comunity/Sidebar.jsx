import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../../assets/1.jpg';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar p-3 liftSidbar">
      <h4>Friends</h4>
      <ul className="list-group">
        <Link to="/profile">
          <li className="list-group-item d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <img src={img1} alt="Friend 1" className="friend-image" />
              <span>احمد انور</span>
            </div>
            <FaUserPlus />
          </li>
        </Link>
        <li className="list-group-item d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <img src={img1} alt="Friend 2" className="friend-image" />
            <span>محمد صالح</span>
          </div>
          <FaUserPlus />
        </li>
        <li className="list-group-item d-flex align-items-center justify-content-between mb-5">
          <div className="d-flex align-items-center">
            <img src={img1} alt="Friend 3" className="friend-image" />
            <span>على هلال</span>
          </div>
          <FaUserPlus />
        </li>
      </ul>
      <button className="btn-sidebar">عرض الكل </button>
    </div>
  );
}

export default Sidebar
