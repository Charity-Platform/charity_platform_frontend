import Carousel from 'react-bootstrap/Carousel';
import imag1 from '../../../assets/بنرات الموقع  [جديد ]-08.jpg';
import imag2 from '../../../assets/بنرات الموقع  [جديد ]-09.jpg';
import imag3 from '../../../assets/بنرات الموقع  [جديد ]-10.jpg';
import imag4 from '../../../assets/بنرات الموقع  [جديد ]-11.jpg';
import imag5 from '../../../assets/بنرات الموقع  [جديد ]-12.jpg';
import imag6 from '../../../assets/بنرات الموقع  [جديد ]-13.jpg';
import './Slider.css';

const Slider = () => {
  return (
    <div>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
          <img
            className="d-block image"
            src={imag1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag2}
            alt="First slide"
          />
     
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag3}
            alt="First slide"
          />
     
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag4}
            alt="Second slide"
          />
    
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag5}
            alt="Third slide"
          />
       
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag6}
            alt="fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slider;
