import './Profile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa'; // For update icons
import Footer from '../../components/HomePage/Footer/Footer';
import NavBar from '../../components/HomePage/NavBar/NavBar';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });
  const [passwordInfo, setPasswordInfo] = useState({ currentPassword: '', newPassword: '' });

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}users/me`,
          { withCredentials: true }
        );
        setUserData(response.data);
        setUserInfo({ name: response.data.name, phone: response.data.phone });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handlers for opening and closing modals
  const handleOpenUpdateInfo = () => setShowUpdateInfoModal(true);
  const handleCloseUpdateInfo = () => setShowUpdateInfoModal(false);
  const handleOpenChangePassword = () => setShowChangePasswordModal(true);
  const handleCloseChangePassword = () => setShowChangePasswordModal(false);

  // Handle input changes for updating user information
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle input changes for updating password
  const handlePasswordInfoChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  // Function to update user information
  const handleUpdateInfo = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}users/updateMe`, userInfo, {
        withCredentials: true,
      });
      alert('تم تحديث المعلومات بنجاح');
      setUserData({ ...userData, ...userInfo });
      handleCloseUpdateInfo();
    } catch (error) {
      alert('Failed to update information. Please try again.');
    }
  };

  // Function to update user password
  const handleChangePassword = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_MAIN_URL}users/update-password`,
        passwordInfo,
        { withCredentials: true }
      );
      alert('Password updated successfully!');
      handleCloseChangePassword();
    } catch (error) {
      console.error('Error updating password:', error.response || error.message);
      alert(`Failed to update password. ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  if (!userData) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="content-profile-page">
        <div className="profile-user-page card-profile">
          <div className="img-user-profile">
            <img
              className="profile-bgHome"
              src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg"
              alt="Background"
            />
          </div>
          <div className="user-profile-data">
            <h1>{userData.name || 'No Name Available'} : الأسم</h1>
            <p>{userData.email || 'No Email Available'} : البريد الإلكترونى</p>
            <p>{userData.phone || 'No Phone Available'} : رقم الهاتف</p>
            <p>{userData.role || 'No Role Assigned'} : الوظيفة</p>
          </div>
          <div className="profile-actions">
            <button onClick={handleOpenUpdateInfo} className="btn btn-primary">
              <FaUserEdit /> Update Information
            </button>
            <button onClick={handleOpenChangePassword} className="btn btn-secondary">
              Update Password
            </button>
          </div>
          <ul className="data-user">
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
        <div className="modal">
          <div className="modal-content">
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
            <button onClick={handleUpdateInfo} className="btn btn-success">Save Changes</button>
            <button onClick={handleCloseUpdateInfo} className="btn btn-danger">Close</button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="modal">
          <div className="modal-content">
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
            <button onClick={handleChangePassword} className="btn btn-success">Update Password</button>
            <button onClick={handleCloseChangePassword} className="btn btn-danger">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
