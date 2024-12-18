import './Cources.css';
import video from '../../assets/background.mp4';
const Cources = () => {
  return (
    <div className="video-background-container">
    <video autoPlay muted loop id="video-background">
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="overlay"></div>
      <div className="content">
        <h1> منصة تطوير لتدريب وتأهيل العاملين في المجال الخيري</h1>
        <h2>منصتك المفضلة لتدريب متخصص </h2>
        <button className="btn btn-Header" >إبدأ التعلم الان </button>
      </div>
    </div>
  )
}

export default Cources
