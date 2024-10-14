import Carousel from 'react-bootstrap/Carousel';
import imag1 from '../../../assets/1.jpg';
import imag2 from '../../../assets/2.jpg';
import imag4 from '../../../assets/4.jpg';
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
          <Carousel.Caption className='description'>
            <h2>استعد للتفوق والابتكار </h2>
            <p>نحن هنا لمساعدتك في اتخاذ القرارات الذكية وتطوير أعمالك بأفضل الحلول، مع  مستشار معتمد في أرقى المؤسسات بالوطن العربي.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag2}
            alt="Second slide"
          />
          <Carousel.Caption className='description'>
            <h2>  الرؤية  </h2>
            <p>المنصة الرائدة في الكويت والعالم العربي لتقديم الدعم الشامل والمتخصص للمؤسسات الخيرية والأهلية، ومساعدتها في تطوير أدائها مما يسهم في تحقيق التنمية المستدامة وإحداث تأثير إيجابي واسع النطاق في المجتمع. </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block image"
            src={imag4}
            alt="Third slide"
          />
          <Carousel.Caption className='description'>
            <h2>  الرسالة  </h2>
            <p>
              تمكين المؤسسات الخيرية والأهلية من خلال تقديم خدمات متخصصة، وبناء استراتيجيات مبتكرة ومناسبة وفعالة تضمن استدامتها وزيادة تأثيرها الإيجابي في المجتمع. 
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slider;
