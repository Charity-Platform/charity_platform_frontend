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
       return 'تواصل معنا  ';
    // Add more cases as needed for different path segments
    default:
      return pathSegment;
  }
};

const Back = ({ title }) => {
  const location = useLocation();

  // Split the pathname and convert the first segment to Arabic
  const arabicSegment = convertToArabic(location.pathname.split("/")[1]);

  return (
    <>
    
  <section className="back"></section>
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
