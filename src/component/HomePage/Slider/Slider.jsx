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
          className="d-block w-100 image"
          src={imag2}
          alt="Second slide"
        />
        <Carousel.Caption className='description'>
          <h2>دعم الجمعيات والمؤسسات الخيرية </h2>
          <p>تخطيط وتأسيس الجمعيات الخيرية وتقديم كل الدعم للكوادر والقائمين على المنظومة </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 image"
          src={imag4}
          alt="Third slide"
        />
        <Carousel.Caption className='description'>
          <h2>طوّر حياتك المهنية والشخصية </h2>
          <p>
           منصة لتدريب الكوادر لدى الجمعيات الخيرية لمواكبة المتطلبات لسوق العمل 
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Slider
