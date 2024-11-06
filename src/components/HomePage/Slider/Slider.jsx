import Carousel from 'react-bootstrap/Carousel';
import imag1 from '../../../assets/5.jpeg';
import imag2 from '../../../assets/6.jpeg';
import imag4 from '../../../assets/7.jpeg';
import imag5 from '../../../assets/8.jpeg';
import img6 from '../../../assets/9.jpeg'
import './Slider.css';

const Slider = () => {
  return (
    <div>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
          <img
            className="d-block image"
            src={img6}
            alt="First slide"
          />
        </Carousel.Item>
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
            alt="Second slide"
          />
    
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag4}
            alt="Third slide"
          />
       
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag5}
            alt="fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slider;
