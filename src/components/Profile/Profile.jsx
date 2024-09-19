import './Profile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import Footer from '../../components/HomePage/Footer/Footer';
import NavBar from '../../components/HomePage/NavBar/NavBar';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });
  const [passwordInfo, setPasswordInfo] = useState({ currentPassword: '', newPassword: '' });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}users/me`, { withCredentials: true });
        setUserData(response.data);
        setUserInfo({ name: response.data.name, phone: response.data.phone });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle modal visibility
  const handleOpenUpdateInfo = () => setShowUpdateInfoModal(true);
  const handleCloseUpdateInfo = () => setShowUpdateInfoModal(false);
  const handleOpenChangePassword = () => setShowChangePasswordModal(true);
  const handleCloseChangePassword = () => setShowChangePasswordModal(false);

  // Handle input changes
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordInfoChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Update user information
  const handleUpdateInfo = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}users/updateMe`, userInfo, { withCredentials: true });
      alert('تم تحديث المعلومات بنجاح');
      setUserData({ ...userData, ...userInfo });
      handleCloseUpdateInfo();
    } catch (error) {
      alert('Failed to update information. Please try again.');
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (!passwordInfo.currentPassword || !passwordInfo.newPassword) {
      alert('Please fill in all required fields.');
      return;
    }
    
    try {
      await axios.put(
        `${import.meta.env.VITE_MAIN_URL}users/update-password`,
        { password: passwordInfo.newPassword },
        { withCredentials: true }
      );
      alert('Password updated successfully!');
      handleCloseChangePassword();
    } catch (error) {
      console.error('Error updating password:', error.response ? error.response.data : error.message);
      alert(`Failed to update password. ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  if (!userData) {
    return <div className='profile-text-center'>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="profile-content-page">
        <div className="profile-user-card">
          <div className="profile-img-container">
            <img
              className="profile-bg-image"
              src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg"
              alt="Background"
            />
          </div>
          <div className="profile-user-data">
            <h1>{userData.name || 'No Name Available'} : الأسم</h1>
            <p>{userData.email || 'No Email Available'} : البريد الإلكترونى</p>
            <p>{userData.phone || 'No Phone Available'} : رقم الهاتف</p>
            <p>{userData.role || 'No Role Assigned'} : الوظيفة</p>
          </div>
          <div className="profile-action-buttons">
            <button onClick={handleOpenUpdateInfo} className="profile-btn-primary">
              <FaUserEdit /> Update Information
            </button>
            <button onClick={handleOpenChangePassword} className="profile-btn-secondary">
              Update Password
            </button>
          </div>

          {/* Display Dashboard for Mentor button if the user is a mentor */}
          {userData.role === 'mentor' && (
            <Link to="/adminMentor">
              <button className="profile-btn-secondary m-2">Dashboard</button>
            </Link>
          )}

          <ul className="profile-user-data-list">
            <li>
              <strong>Joined:</strong> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
            </li>
            <li>
              <strong>Last Updated:</strong> {userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'Unknown'}
            </li>
          </ul>
        </div>
      </div>

      {/* Update Information Modal */}
      {showUpdateInfoModal && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h2>Update Information</h2>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleUserInfoChange}
              placeholder="Enter new name"
            />
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              placeholder="Enter new phone number"
            />
            <button onClick={handleUpdateInfo} className="profile-btn-save">Save Changes</button>
            <button onClick={handleCloseUpdateInfo} className="profile-btn-close">Close</button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h2>Change Password</h2>
            <input
              type="password"
              name="currentPassword"
              value={passwordInfo.currentPassword}
              onChange={handlePasswordInfoChange}
              placeholder="Enter current password"
            />
            <input
              type="password"
              name="newPassword"
              value={passwordInfo.newPassword}
              onChange={handlePasswordInfoChange}
              placeholder="Enter new password"
            />
            <button onClick={handleChangePassword} className="profile-btn-save">Update Password</button>
            <button onClick={handleCloseChangePassword} className="profile-btn-close">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
