import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Services.css';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/code1.jpg';
import img2 from '../../../assets/code2.jpg';
import img3 from '../../../assets/code3.jpg';
import img4 from '../../../assets/code4.jpg';

const servicesData = [
  {
    id: 1,
    title: "تصميم المواقع",
    description: "خدمات تصميم مواقع بجودة عالية وتقنيات حديثة لضمان أفضل تجربة مستخدم.",
    image: img1,
  },
  {
    id: 2,
    title: "برمجة تطبيقات الموبايل",
    description: "تطوير تطبيقات موبايل مبتكرة تعمل على جميع أنظمة التشغيل.",
    image: img2,
  },
  {
    id: 3,
    title: "تسويق المواقع",
    description: "استراتيجيات تسويقية فعّالة لزيادة شهرة المواقع وجذب المزيد من الزوار.",
    image: img3,
  },
  {
    id: 4,
    title: " تطوير المواقع القديمة",
    description: "خدمات تحديث المواقع بشكل دوري لضمان محتوى متجدد وتصميم عصري.",
    image: img4,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Services = () => {
  return (
    <div className="services-container text-center">
      <h1 className="services-heading">خدماتنا البرمجية</h1>
      <p className="services-subheading">
        اكتشف خدماتنا الاحترافية في تطوير المواقع، برمجة التطبيقات، والتسويق الرقمي.
      </p>
      
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        autoPlay={true} 
        autoPlaySpeed={3000} 
        showDots={true} 
        className="services-carousel"
      >
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-image-container">
              <img src={service.image} alt={service.title} className="service-image" />
            </div>
            <div className="service-card-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="more-services">
        <Link to="/full-services" className="more-services-btn">عرض المزيد من الخدمات</Link>
      </div>
    </div>
  );
};

export default Services;
