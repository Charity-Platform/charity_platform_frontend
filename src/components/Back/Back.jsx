import { useLocation } from 'react-router-dom';
import './Back.css';

// Function to convert specific path segments to Arabic
const convertToArabic = (pathSegment) => {
  switch (pathSegment) {
    case 'home':
      return 'الرئيسية';
    case 'about':
      return 'من نحن ';
    case 'services':
      return 'الاستشارات ';
    case 'instructors':
      return 'المستشارين ';
    case 'contact':
      return 'تواصل معنا ';
    default:
      return pathSegment;
  }
};

const Back = ({ title, backgroundImage }) => {
  const location = useLocation();
  const arabicSegment = convertToArabic(location.pathname.split("/")[1]);

  return (
    <>
      <section 
        className="back" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></section>
      <div className="text-overlay">
        <h2>الرئيسية / {arabicSegment}</h2>
        <h1>{title}</h1>
      </div>
      <div className="margin">
        {/* Add any additional content here */}
      </div>
    </>
  );
};

export default Back;
