import 'react-multi-carousel/lib/styles.css';
import image2 from '../../../assets/img-2.jpeg';
import './Instructors.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card';

const Instructor = () => { 
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

return (
  <div className="container text-center p-5 instructor-section">
    <h1 className="heading w-2 p-5 text-center-instructor ">المستشارين </h1>
    <Carousel 
        responsive={responsive} 
        swipeable={true} 
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={3000} // سرعة التشغيل التلقائي بالمللي ثانية (1000 مللي ثانية = 1 ثانية)
        infinite={true}
      >
        <div className="p-2 ">
          <Card style={{ width: '25rem',height:'32rem'}}>
            <Card.Img variant="top" src={image2} className='card-image'/>
            <Card.Body>
              <Card.Title>الدكتور : محمد عبد العاطى </Card.Title>
              <Card.Text className='location'>
             <h5 className='text-location'>المملكة العربية السعودية<i className="fa-solid fa-location-dot fa-bounce location-icon"  style={{color: "#07a79d"}}></i>    </h5>   
             </Card.Text>
            </Card.Body>          
            <button  className="btn-card"> استشرنى </button>

          </Card>
        </div>
        <div className="p-2">
          <Card style={{ width: '25rem',height:'32rem' }} className='card'>
            <Card.Img variant="top" src={image2}  className='card-image'/>
            <Card.Body>
              <Card.Title>الدكتور : محمد صالح </Card.Title>
              <Card.Text className='location'>
             <h5 className='text-location'>المملكة العربية السعودية<i className="fa-solid fa-location-dot fa-bounce location-icon"  style={{color: "#07a79d"}}></i>    </h5>   
             </Card.Text>
            </Card.Body>       
             <button  className="btn-card"> استشرنى </button>

          </Card>
        </div>
        <div className="p-2">
          <Card style={{ width: '25rem',height:'32rem' }}>
            <Card.Img variant="top" src={image2} className='card-image' />
            <Card.Body>
              <Card.Title>الدكتور : على هلال </Card.Title>
              <Card.Text className='location'>
             <h5 className='text-location'>المملكة العربية السعودية<i className="fa-solid fa-location-dot fa-bounce location-icon"  style={{color: "#07a79d"}}></i>    </h5>   
             </Card.Text>
            </Card.Body>        
              <button   className="btn-card"> استشرنى </button>

          </Card>
        </div>
        <div className="p-2">
          <Card style={{ width: '25rem',height:'32rem' }}>
            <Card.Img variant="top" src={image2} className='card-image' />
            <Card.Body>
              <Card.Title>الدكتور : احمد انور </Card.Title>
              <Card.Text className='location'>
             <h5 className='text-location'>المملكة العربية السعودية<i className="fa-solid fa-location-dot fa-bounce location-icon"  style={{color: "#07a79d"}}></i>    </h5>   
             </Card.Text>           
            </Card.Body>
             <button  className="btn-card"> استشرنى</button>
          </Card>
        </div>
      </Carousel>
      <div className='btn-more'>
      <button  className="btn-more-dir"> عرض الجميع </button>

      </div>
  </div>
  );
}

export default Instructor;
