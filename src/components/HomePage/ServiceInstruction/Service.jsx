import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Services.css';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/services/تأسيس وبناء الموسسات الخيرية .jpeg';
import img2 from '../../../assets/services/إدارة المشاريع .jpg';
import img3 from '../../../assets/services/تسويق وبناء هوية .jpg';
import img4 from '../../../assets/services/تخطيط استراتيجي .jpg';
import img5 from '../../../assets/services/المالي .jpg';
import img6 from '../../../assets/services/إدارة الجودة .jpg';
import img7 from '../../../assets/services/إدارة المخاطر.jpg';
import img8 from '../../../assets/services/تخطيط استراتيجي 2.jpg';
import img9 from '../../../assets/services/تنمية الموارد .jpg';
import img10 from '../../../assets/services/التدريب والتطوير.jpg';
import img11 from '../../../assets/services/العلاقات العامة .jpg';
import img12 from '../../../assets/code4.jpg';






const servicesData = [
    {
        id: 1,
        title: "تأسيس وبناء الجمعيات الخيرية",
        description: "نوفر استشارات لبناء جمعيات خيرية فعالة.",
        image:img1,
       
      },
      {
        id: 2,
        title: "إدارة المشاريع الخيرية",
        description: "نقدم استشارات لإدارة المشاريع الخيرية بنجاح.",
        image:img2,
       
      },
      {
        id: 3,
        title: "التسويق وبناء الهوية (فريق تسويقي متخصص)",
        description: "نقدم خدمات تسويقية لبناء هوية المؤسسة الخيرية.",
        image:img3,
       
      },
      {
        title: "التخطيط الاستراتيجي",
        description: "نساعد في وضع وتطوير خطط استراتيجية شاملة.",
        image: img4,
     
      },
      {
        title: "التخطيط المالي والميزانيات",
        description: "توفير خدمات تخطيط مالي وإعداد ميزانيات دقيقة.",
        image: img5,
      
      },
      {
        title: "إدارة الجودة وتحسين الأداء",
        description: "تقييم وتطوير نظم إدارة الجودة لضمان الأداء الفعال.",
        image:img6,
        
      },
      {
        title: "الامتثال والحوكمة وإدارة المخاطر",
        description: "نوفر حلول لتحقيق الامتثال والحوكمة وإدارة المخاطر.",
        image:img7,
      
      },
       {
        title: "تحديد المخاطر وتصميم استراتيجيات للحد منها",
        description: "نساعد في تقليل المخاطر وتوفير استراتيجيات فعّالة.",
        image:img8,
       
      },
      {
        title: "تنمية الموارد المالية",
        description: "نوفر استراتيجيات مبتكرة لتنمية الموارد المالية.",
        image: img9,
    
      },
      {
        title: "التدريب والتطوير",
        description: "نوفر برامج تدريبية لتعزيز مهارات العاملين.",
        image: img10,
       
      },
      {
        title: "العلاقات العامة والتواصل وبناء الشراكات",
        description: "تطوير استراتيجيات للتواصل وبناء الشراكات الفعّالة.",
        image:img11,
      
      },
      {
        title: "الخدمات البرمجية",
        description: "اكتشف خدماتنا الاحترافية في تطوير المواقع، برمجة التطبيقات، والتسويق الرقمي",
        image:img12,
      
      }
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
      <h1 className="services-heading">خدماتنا </h1>
      <p className="services-subheading">
      اكتشف خدماتنا الاحترافية في تأسيس الجمعيات الخيرية، بناء المشاريع المجتمعية، ودعم المبادرات الإنسانية    
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
        <Link to="/services" className="more-services-btn">عرض المزيد من الخدمات</Link>
      </div>
    </div>
  );
};

export default Services;
