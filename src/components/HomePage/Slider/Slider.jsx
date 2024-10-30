import Carousel from 'react-bootstrap/Carousel';
import imag1 from '../../../assets/5.jpeg';
import imag2 from '../../../assets/6.jpeg';
import imag4 from '../../../assets/7.jpeg';
import imag5 from '../../../assets/8.jpeg';

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
          {/* <Carousel.Caption className='description'>
            <h2>استعد للتفوق والابتكار </h2>
            <p>تقدم منصتنا حلولاً مبتكرة ومستدامة لتمكن مؤسستك من اتخاذ قرارات استراتيجية ذكية وتطوير أعمالكم الخيرية بكفاءة عالية، بدعم من مستشارين معتمدين في أبرز المؤسسات على مستوى الوطن العربي. </p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag2}
            alt="Second slide"
          />
          {/* <Carousel.Caption className='description'>
            <h2>  الرؤية  </h2>
            <p>المنصة الرائدة في الكويت والعالم العربي لتقديم الدعم الشامل والمتخصص للمؤسسات الخيرية والأهلية، ومساعدتها في تطوير أدائها مما يسهم في تحقيق التنمية المستدامة وإحداث تأثير إيجابي واسع النطاق في المجتمع. </p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag4}
            alt="Third slide"
          />
          {/* <Carousel.Caption className='description'>
            <h2>  الرسالة  </h2>
            <p>
              تمكين المؤسسات الخيرية والأهلية من خلال تقديم خدمات متخصصة، وبناء استراتيجيات مبتكرة ومناسبة وفعالة تضمن استدامتها وزيادة تأثيرها الإيجابي في المجتمع. 
            </p>
          </Carousel.Caption> */}
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
