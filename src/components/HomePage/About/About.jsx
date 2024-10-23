import React from 'react';
import './About.css';
import imag1 from '../../../assets/1.jpg';
import { Link } from 'react-router-dom';
import About_Icon from './About-Icon';

const About = () => {
  return (
    <div className="about-container">
      <div className="container" dir='rtl'>
        <h1 className="heading w-2 pt-5 text-center text-about">
          <span> عن </span> المرشد الخيرى
        </h1>
        <div className='about-content row'>
          <div className='col-12 col-md-6 order-2 order-md-1'>
            <img src={imag1} alt='' className='img-fluid' />
          </div>
          <div className='col-12 col-md-6 order-1 order-md-2'>
            <h1 className='about-h1'>المرشد الخيرى</h1>
            <p className='about-p'>
            المنصة الأولي من نوعها في الوطن العربي والمتخصصة في تقديم خدمات متكاملة لمؤسسات العمل الإنساني بهدف تعزيز كفاءتها وفعاليتها والارتقاء بمستوى عملها بتلبية احتياجاتها من استشارات وتدريب وتطوير كوادرها عبر نخبة كبيرة من المستشارين والخبراء في مجال العمل الإنساني.
            </p>
            <Link to="/about">
              <button className='btn-about'>معرفة المزيد</button>
            </Link>
          </div>
        </div>

        {/* Vision Section */}
        <div className="about-box">
          <h2 className="section-title">رؤيتنا</h2>
          <p className="section-content">
          المنصة الأولى والرائدة في الكويت والوطن العربي لتقديم الدعم الشامل والمتخصص للمؤسسات الخيرية والإنسانية،
           ومساعدتها في تطوير أدائها لتحقيق الاستدامة وإحداث تأثير إيجابي واسع النطاق في المجتمع.
          </p>
        </div>

        {/* Mission Section */}
        <div className="about-box">
          <h2 className="section-title">رسالتنا</h2>
          <p className="section-content">
            تمكين المؤسسات الخيرية والانسانية من خلال تقديم خدمات متخصصة، وبناء
            استراتيجيات مبتكرة ومناسبة وفعالة تضمن استدامتها وزيادة تأثيرها
            الإيجابي في المجتمع.
          </p>
        </div>

       {/* Goals Section */}
<div className="about-box goals-section">
  <h2 className="section-title">أهدافنا </h2>
  <div className="goals-content">
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>تعزيز كفاءة المؤسسات الخيرية:</span> تحسين إدارة العمليات والموارد لضمان تحقيق الأهداف بأعلى مستويات الكفاءة.</li>
        <li><span className='span-title'> زيادة الوعي بالمشاريع الخيرية:</span> تطوير استراتيجيات تسويقية لزيادة الوعي والدعم للمشاريع الخيرية.</li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>توفير الدعم الاستشاري المتخصص:</span> تقديم استشارات من خبراء في المجال الخيري لمساعدة المؤسسات على التغلب على التحديات وتحقيق النجاح.</li>
        <li><span className='span-title'> تنمية الموارد المالية:</span> تطوير أساليب مبتكرة لجمع التبرعات وتنمية الموارد لدعم استدامة المشاريع الخيرية.</li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>تحقيق الشفافية والمساءلة:</span> مساعدة المؤسسات الخيرية في تحقيق أعلى معايير الشفافية والمساءلة لضمان الثقة والدعم المستمر من المجتمع.</li>
        <li><span className='span-title'> تأهيل الكفاءات: </span>المساهمة في تأهيل وتدريب الكفاءات المتخصصة العاملة بالمجال الخيري .</li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'> الاستدامة:</span> تعزيز مفهوم الاستدامة وإدارة المعرفة في القطاع الخيري من خلال الشراكات الاستراتيجية.</li>
      </ul>
    </div>
  </div>
</div>

      </div>

      <About_Icon />
    </div>
  );
};

export default About;
