import React from 'react';
import CountUp from 'react-countup';
import icon1 from '../../../assets/icon5.png';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';
import icon4 from '../../../assets/icon4.png';
import icon6 from '../../../assets/icon6.png';
import icon7 from '../../../assets/icon7.png';
import icon8 from '../../../assets/icon8.png';


import './About.css';

const About_Icon = () => {
  const happyClients = 850;
  const totalClients = 230;
  const sales = 9450;
  const discounts = 780;

  return (
    <div className="container text-center p-4 icon-about">
      <div className='center-icon'>
        <h2>? <span>لماذا  </span> المرشد الخيرى </h2>
      </div>
      <div className="row p-2">
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  icon">
          <img src={icon1} alt='' />
          <h2 className="fw-bolder">
          خبرة متخصصة
          </h2>
          <p className="text-muted fw-bolder"> تضم المنصة نخبة من الخبراء المتخصصين في مجال العمل الخيري، ما يضمن تقديم استشارات عملية ودقيقة تساعد في تطوير مؤسساتكم الخيرية.</p>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  icon">
          <img src={icon3} alt='' />
          <h2 className="fw-bolder">
          خدمات شاملة
          </h2>
          <p className="text-muted fw-bolder">تقدم المنصة مجموعة متكاملة من الخدمات، بدءًا من التخطيط الاستراتيجي وإدارة المشاريع وحتى تنمية الموارد والتسويق الرقمي.</p>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  icon">
          <img src={icon2} alt='' />
          <h2 className="fw-bolder">
          موارد تعليمية غنية
          </h2>
          <p className="text-muted fw-bolder"> توفر مكتبة غنية من الكتب والمراجع والأدوات التي تدعم المؤسسات والأفراد في تطوير معرفتهم ومهاراتهم في المجال الخيري.</p>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  icon">
          <img src={icon6} alt='' />
          <h2 className="fw-bolder">
          مصادر تعليمية متنوعة
          </h2>
          <p className="text-muted fw-bolder">  تحتوي المنصة على موارد معرفية وأدوات تعليمية متنوعة، تساعد الأفراد والمؤسسات على تحسين مهاراتهم وبناء قاعدة معرفية قوية في المجال الخيري.</p>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  icon">
          <img src={icon7} alt='' />
          <h2 className="fw-bolder">
          حلول مبتكرة ومرنة
          </h2>
          <p className="text-muted fw-bolder"> تتيح المنصة حلولًا مبتكرة ومخصصة تلبي احتياجات المؤسسات بمختلف أحجامها واحتياجاتها </p>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  icon">
          <img src={icon8} alt='' />
          <h2 className="fw-bolder">
          شراكة في النجاح
          </h2>
          <p className="text-muted fw-bolder"> نحن شريكك الاستراتيجي لتحقيق أثر مستدام من خلال توجيه استراتيجيات فعالة تعمل على تعظيم الأثر وتحقيق الأهداف الخيرية بفعالية</p>
        </div>
      </div>
    </div>
  );
};

export default About_Icon;
