import './Profile.css';
import { FaUserPlus } from 'react-icons/fa';
import img1 from  '../../assets/img-2.jpeg'
import Footer from '../../components/HomePage/Footer/Footer'
import NavBar from '../../components/HomePage/NavBar/NavBar'
const Profile = () => {
  return (
    <>
   <NavBar/>
    <div className="content-profile-page">
   <div className="profile-user-page card-profile">
      <div className="img-user-profile">
        <img className="profile-bgHome" src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg" />
        <img className="avatar" src={img1} alt="jofpin"/>
           </div>
          <button>متابعة </button>
          <div className="user-profile-data">
            <h1>احمد انور </h1>
            <p>مندوب مبيعات لدى شركة الدهار </p>
          </div> 
       <ul className="data-user">
        <li><a><strong>3390</strong><span>Posts</span></a></li>
        <li><a><strong>718</strong><span>Followers</span></a></li>
        <li><a><strong>239</strong><span>Following</span></a></li>
       </ul>
      </div>
    </div>
    <Footer/>
    </>

  )
}

export default Profile
