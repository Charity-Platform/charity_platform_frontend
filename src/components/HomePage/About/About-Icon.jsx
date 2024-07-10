import React from 'react';
import CountUp from 'react-countup';
import icon1 from '../../../assets/icon5.png';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';
import icon4 from '../../../assets/icon4.png';
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
        <div className="col-md-2 col-sm-6 mb-sm-3 icon">
          <img src={icon1} alt='' />
          <h2 className="fw-bolder">
            <CountUp start={0} end={happyClients} duration={3} />
          </h2>
          <p className="text-muted fw-bolder"> نوفر لكم أفضل المستشارين للرد على إستفساراتكم .</p>
        </div>
        <div className="col-md-2 col-sm-6 mb-sm-3 icon">
          <img src={icon3} alt='' />
          <h2 className="fw-bolder">
            <CountUp start={0} end={totalClients} duration={3} />
          </h2>
          <p className="text-muted fw-bolder"> لحلول ذكية ورؤية جديدة لتحقيق التطور و التقدم</p>
        </div>
        <div className="col-md-2 col-sm-6 mb-sm-2 icon">
          <img src={icon4} alt='' />
          <h2 className="fw-bolder">
            <CountUp start={0} end={sales} duration={3} />
          </h2>
          <p className="text-muted fw-bolder"> دعم لجميع مجالات الأعمال في القطاع غير الربحي </p>
        </div>
        <div className="col-md-2 col-sm-6 mb-sm-3 icon">
          <img src={icon2} alt='' />
          <h2 className="fw-bolder">
            <CountUp start={0} end={discounts} duration={3} />
          </h2>
          <p className="text-muted fw-bolder"> عملية إلكترونية كاملة سريعة التجاوب فالسرعة أحد أهم القواعد التي ننطلق من خلاله </p>
        </div>
      </div>
    </div>
  );
};

export default About_Icon;
