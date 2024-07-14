import React from 'react'
import Carousel from 'react-multi-carousel';
import Card from 'react-bootstrap/Card';
import image2 from '../../assets/4.jpg';
import './MainInstructor.css';

const MainInstructor = () => {
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
    <div className="container text-center instructor-section ">
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
              <Card.Text className='job-description'>
              <h5 className='job-description-text'> أخصائى تدريب رواد أعمال </h5>   
             </Card.Text>
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
              <Card.Text className='job-description'>
              <h5 className='job-description-text'> أخصائى تدريب رواد أعمال </h5>   
             </Card.Text>
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
              <Card.Text className='job-description'>
              <h5 className='job-description-text'>اخصائى تخطيط جمعيات  خيرية  </h5>   
             </Card.Text>
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
              <Card.Text className='job-description'>
              <h5 className='job-description-text'>  إستشارى علاقات عامة  </h5>   
             </Card.Text>
              <Card.Text className='location'>
             <h5 className='text-location'>المملكة العربية السعودية<i className="fa-solid fa-location-dot fa-bounce location-icon"  style={{color: "#07a79d"}}></i>    </h5>   
             </Card.Text>           
            </Card.Body>
             <button  className="btn-card"> استشرنى</button>
          </Card>
        </div>
        
      </Carousel>
  
  </div>
  )
}

export default MainInstructor
