import React from 'react'
import './About.css';
import imag1 from '../../../assets/1.jpg';
import { Link } from 'react-router-dom';
import About_Icon from './About-Icon';


const About = () => {
  return (
    <div>
      
<div className="container" dir='rtl' >
<h1 className="heading w-2 pt-5 text-center text-about"><span> عن </span> المرشد الخيرى </h1>
<div className='about-content row'>
  <div className='col-12 col-md-6 order-2 order-md-1'>
    <img src={imag1} alt='' className='img-fluid' />
  </div>
  <div className=' col-12 col-md-6 order-1 order-md-2  '>
    <h1 className='about-h1'>المرشد الخيرى</h1>
    <p className='about-p'>المنصة الأولى من نوعها في الكويت المتخصصة في تقديم خدمات متكاملة للمؤسسات الخيرية والأهلية بهدف تعزيز كفاءتها وفعاليتها، من خلال الارتقاء بمستوى عملها بتلبية احتياجاتهم من استشارات وتدريب وتطوير كوادرها، عبر نخبة كبيرة من المستشارين والخبراء في مجال العمل الخيري والأهلي.</p>
   <Link to="/about">
   <button className='btn-about'  >معرفة المزيد </button>
   </Link>
    
  </div>
</div>

</div>
<About_Icon/>
    </div>
  )
}

export default About

