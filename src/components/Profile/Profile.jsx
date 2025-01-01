import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import Footer from "../../components/HomePage/Footer/Footer";
import NavBar from "../../components/HomePage/NavBar/NavBar";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState({ info: false, password: false });
  const [userInfo, setUserInfo] = useState({ name: "", phone: "" , email: "" , description: "" , field: "" , address: ""});
  const [passwordInfo, setPasswordInfo] = useState({ currentPassword: "", newPassword: "" });
  const [courses ,setcourses ]= useState([]);
  const [books ,setbooks ]= useState([]);
  const [instruction ,setinstruction ]= useState([]);
const [hasid , sethasid]=useState();

  // Fetch user data on initial render
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}users/me`, { withCredentials: true });
        setUserData(response.data);
        setUserInfo({ name: response.data.name, phone: response.data.phone , email: response.data.email , description: response.data.description , field: response.data.field , address: response.data.address});
        sethasid(response.data._id)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    //git all courses 
    // const fetchAllUser = async () => {
    //   try {
    //     const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${hasid}`, { withCredentials: true });
    //     setcourses(response.data);
    //   } catch (error) {
    //     console.error("Error fetching courses:", error);
    //   }
    // };
    // fetchAllUser();

    
    //git all books 
    // const fetchAllBooks = async () => {
    //   try {
    //     const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books/${hasid}`, { withCredentials: true });
    //     setcourses(response.data);
    //   } catch (error) {
    //     console.error("Error fetching courses:", error);
    //   }
    // };
    // fetchAllBooks();
  }, []);

  const toggleModal = (modalType) => {
    setShowModal(prev => ({
      info: modalType === "info" ? !prev.info : false,
      password: modalType === "password" ? !prev.password : false
    }));
  };

  // Handle input change for user info and password
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "userInfo") {
      setUserInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPasswordInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateInfo = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}users/updateMe`, userInfo, { withCredentials: true });
      alert("تم تحديث المعلومات بنجاح");
      setUserData(prevData => ({ ...prevData, ...userInfo }));
      toggleModal("info");
    } catch (error) {
      console.error("Error updating info:", error);
      alert("Failed to update information. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    // تحقق من ملء الحقول
    if (!passwordInfo.currentPassword || !passwordInfo.newPassword) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MAIN_URL}users/update-password`,
        {
          currentPassword: passwordInfo.currentPassword,
          newPassword: passwordInfo.newPassword,
        },
        { withCredentials: true }
      );
      alert("Password updated successfully!");
      toggleModal("password");
    } catch (error) {
      console.error("Error updating password:", error);
      const errorMessage = error.response?.data?.message || "Please try again.";
      alert(`Failed to update password. ${errorMessage}`);
    }
  };
  

  if (!userData) {
    return <div className="profile-text-center">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="profile-content-page">
        <div className="profile-user-card">
          <div className="profile-img-container">
            <img
              className="profile-bg-image"
              src="https://cdn.pixabay.com/photo/2019/01/29/11/19/career-3962170_1280.jpg"
              alt="Background"
            />
          </div>
          <div className="profile-user-data">
            <h1>{userData.name || "No Name Available"} : الأسم</h1>
            <p>{userData.email || "No Email Available"} : البريد الإلكترونى</p>
            <p>{userData.phone || "No Phone Available"} : رقم الهاتف</p>
            <p>{userData.role || "No Role Assigned"} : الوظيفة</p>
            <p>  المجال : {userData.field || "No field Assigned"}</p>
            <p> الدولة المقيمم فيها  : {userData.address || "No city Assigned"}</p>
            <p> تفاصيل الخبرة  : {userData.description || "No description Assigned"}</p>


          </div>
          <div className="profile-action-buttons">
            <button onClick={() => toggleModal("info")} className="profile-btn-primary">
              <FaUserEdit /> تحديث المعلومات
            </button>
            <button onClick={() => toggleModal("password")} className="profile-btn-secondary">
              تحديث الباسورد
            </button>
          </div>

          {/* Display appropriate dashboard button based on user role */}
          {userData.role === "mentor" && (
            <Link to={`/adminMentor/${userData._id}`}>
              <button className="profile-btn-secondary m-2 dashbord-button">
                الدخول على صفحة المنتور
              </button>
            </Link>
          )}
          {userData.role === "admin" || userData.role === "manager" && (
            <Link to="/DashBoard">
              <button className="profile-btn-secondary m-2 dashbord-button">
                الدخول على صفحة الادمن
              </button>
            </Link>
          )}

          <ul className="profile-user-data-list">
            <li><strong>تاريخ الانضمام :</strong> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Unknown"}</li>
            <li><strong>اخر تاريخ للانضمام :</strong> {userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : "Unknown"}</li>
          </ul>
        </div>
      </div>

      {/* Modal rendering logic */}
      {(showModal.info || showModal.password) && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            {showModal.info ? (
              <>
                <h2>تحديث المعلومات</h2>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange(e, "userInfo")}
                  placeholder="أدخل الاسم الجديد"
                />
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange(e, "userInfo")}
                  placeholder="أدخل رقم الهاتف الجديد"
                />
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange(e, "userInfo")}
                  placeholder="أدخل البريد الالكترونى الجديد"
                />
                 <input
                  type="text"
                  name="field"
                  value={userInfo.field}
                  onChange={(e) => handleInputChange(e, "userInfo")}
                  placeholder="أدخل المجال الجديد"
                />
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={(e) => handleInputChange(e, "userInfo")}
                  placeholder="أدخل العنوان الجديد"
                />
                <input
                  type="text"
                  name="description"
                  value={userInfo.description}
                  onChange={(e) => handleInputChange(e, "userInfo")}
                  placeholder="أدخل تفاصيل الخبرة الجديدة"
                />
                 <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  placeholder="اختر صورة جديدة"
                />
                <button onClick={handleUpdateInfo} className="profile-btn-save">
                  حفظ التغييرات
                </button>
              </>
            ) : (
              <>
                <h2>تغيير كلمة المرور</h2>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordInfo.currentPassword}
                  onChange={(e) => handleInputChange(e, "password")}
                  placeholder="أدخل كلمة المرور الحالية"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordInfo.newPassword}
                  onChange={(e) => handleInputChange(e, "password")}
                  placeholder="أدخل كلمة المرور الجديدة"
                />
                <button onClick={handleChangePassword} className="profile-btn-save">
                  تحديث كلمة المرور
                </button>
              </>
            )}
            <button onClick={() => toggleModal(showModal.info ? "info" : "password")} className="profile-btn-close">
              إغلاق
            </button>
          </div>
        </div>
      )}
      

      <Footer />
    </>
  );
};

export default Profile;
