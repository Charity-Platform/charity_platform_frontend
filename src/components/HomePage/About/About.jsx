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
          <span> عن </span> استشارة
        </h1>
        <div className='about-content row'>
          <div className='col-12 col-md-6 order-2 order-md-1'>
            <img src={imag1} alt='' className='img-fluid' />
          </div>
          <div className='col-12 col-md-6 order-1 order-md-2'>
            <h1 className='about-h1'>استشارة</h1>
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
          <h2 className="section-title">الرؤية</h2>
          <p className="section-content">
          المنصة الأولى والرائدة في الوطن العربي لدعم وتطوير العمل الخيري والإنساني.
          </p>
        </div>

        {/* Mission Section */}
        <div className="about-box">
          <h2 className="section-title">الرسالة</h2>
          <p className="section-content">
          تمكين المؤسسات الخيرية والإنسانية عبر خدمات متخصصة، وبناء استراتيجيات مبتكرة وفعالة تضمن استدامتها وزيادة تأثيرها الإيجابي. 
          </p>
        </div>

       {/* Goals Section */}
<div className="about-box goals-section">
  <h2 className="section-title">أهدافنا </h2>
  <div className="goals-content">
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>  1.	تعزيز كفاءة وفعالية المؤسسات الخيرية والارتقاء بجود خدماتها.</span></li>
       
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>2.	تأهيل وتدريب الكفاءات من العاملين في المجال الخيري والإنساني.</span></li>
       
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>3.	توفير دعم استشاري متخصص والاستفادة من الخبرات ونقل المعرفة.</span></li>
      
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'> 4.	تقديم خدمات إدارية متكاملة وفق أفضل التطبيقات والمنهجيات الحديثة.</span></li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>5.	مساعدة المؤسسات الخيرية في تحقيق أعلى معايير الشفافية والمساءلة. </span></li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>6.	تعزيز الاستدامة وإدارة المعرفة في القطاع الخيرية </span></li>
      </ul>
    </div>
  </div>
</div>
<div className="about-box goals-section">
  <h2 className="section-title">قيمنا </h2>
  <div className="goals-content">
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>	الابتكار </span>حلول وخدمات استشارية متجددة ومواكبة لأحدث الممارسات في العمل الخيري والإنساني</li>
        <li><span className='span-title'>الاحترافية </span>  الالتزام بمعايير عالية في تقديم الاستشارات والتدريب لضمان الجودة والتميز</li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>	التمكين </span> دعم المؤسسات لتطوير قدراتها وتحقيق أهدافها بكفاءة وفاعلية.</li>
        <li><span className='span-title'>التأثير </span> التركيز على تحقيق الأثر الإيجابي والمستدام للمؤسسات والمجتمعات المستهدفة.</li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'>	الإنسانية </span> التركيز على القيم الأخلاقية والإنسانية في كل ما نقدمه</li>
        <li><span className='span-title'> تأهيل الكفاءات  </span>المساهمة في تأهيل وتدريب الكفاءات المتخصصة العاملة بالمجال الخيري .</li>
      </ul>
    </div>
    <div className="goal-column">
      <ul>
        <li><span className='span-title'> الاستدامة </span> تعزيز مفهوم الاستدامة وإدارة المعرفة في القطاع الخيري من خلال الشراكات الاستراتيجية.</li>
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
