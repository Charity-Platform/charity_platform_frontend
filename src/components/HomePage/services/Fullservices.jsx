import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './FullServices.css'; // New stylesheet for this page
import video from '../../../assets/blog.mp4'; // Sample video path
import newImg1 from '../../../assets/code1.jpg';
import newImg2 from '../../../assets/code2.jpg';
import newImg3 from '../../../assets/code3.jpg';
import newImg4 from '../../../assets/code4.jpg';
import newImg5 from '../../../assets/code5.jpg';
import video6 from '../../../assets/code6.mp4';

import NavBar from '../NavBar/NavBar';

const NewFullServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <div className="new-fullservices-container">
      <NavBar />

      {/* Hero Section */}
      <header className="new-hero-section">
  <video className="new-hero-video" autoPlay muted loop>
    <source src={video6} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="new-hero-content text-center text-white">
    <h1 className="new-hero-title">هدفنا هو نجاحك</h1>
    <p className="new-hero-subtitle">
      نحن شريكك لحل التحديات وخلق الفرص الجديدة.
    </p>
    <Button variant="primary" className="new-hero-button">
      اطلب عرض
    </Button>
    <Button variant="outline-light" className="new-hero-button">
      عرض أعمالنا
    </Button>
  </div>
</header>


      {/* Services Section */}
      <section className="new-services-section">
        <Container>
          <h2 className="new-section-title">خدماتنا</h2>
          <Row>
            {/* Service 1 */}
            <Col md={4}>
              <div className="new-service-card">
                <img
                  src={newImg1}
                  alt="Web Design"
                  className="new-service-img"
                />
                <h3 className="new-service-title">تصميم وبرمجة المواقع</h3>
                <p className="new-service-description">
                  تصميم مواقع عالية الجودة باستخدام التقنيات الحديثة.
                </p>
                <Button
                  variant="info"
                  onClick={() =>
                    handleModalShow(
                      "خدمة تصميم المواقع: نقدم لك تصميم مواقع مبتكرة وسريعة استنادًا إلى التقنيات الحديثة لضمان أفضل تجربة للمستخدم."
                    )
                  }
                  className="new-service-btn"
                >
                  تفاصيل
                </Button>
                <Button variant="success" className="new-service-btn">
                  اطلبها الآن
                </Button>
              </div>
            </Col>

            {/* Service 2 */}
            <Col md={4}>
              <div className="new-service-card">
                <img
                  src={newImg2}
                  alt="Mobile Apps"
                  className="new-service-img"
                />
                <h3 className="new-service-title">تطوير تطبيقات الموبايل</h3>
                <p className="new-service-description">
                  تطوير تطبيقات لجميع الأنظمة التشغيلية.
                </p>
                <Button
                  variant="info"
                  onClick={() =>
                    handleModalShow(
                      "خدمة تطوير التطبيقات: نقدم لك حلول تطوير تطبيقات موبايل عالية الجودة لمختلف المنصات."
                    )
                  }
                  className="new-service-btn"
                >
                  تفاصيل
                </Button>
                <Button variant="success" className="new-service-btn">
                  اطلبها الآن
                </Button>
              </div>
            </Col>

            {/* Service 3 */}
            <Col md={4}>
              <div className="new-service-card">
                <img src={newImg3} alt="UI/UX" className="new-service-img" />
                <h3 className="new-service-title">
                  تصميم واجهات المستخدم
                </h3>
                <p className="new-service-description">
                  إنشاء واجهات جميلة وسهلة الاستخدام.
                </p>
                <Button
                  variant="info"
                  onClick={() =>
                    handleModalShow(
                      "خدمة تصميم واجهات المستخدم: نقدم لك حلول تصميم واجهات المستخدم مع التركيز على تحسين تجربة المستخدم لضمان رضا العملاء."
                    )
                  }
                  className="new-service-btn"
                >
                  تفاصيل
                </Button>
                <Button variant="success" className="new-service-btn">
                  اطلبها الآن
                </Button>
              </div>
            </Col>

            {/* Service 4 */}
            <Col md={4}>
              <div className="new-service-card">
                <img
                  src={newImg4}
                  alt="E-Commerce"
                  className="new-service-img"
                />
                <h3 className="new-service-title">حلول التجارة الإلكترونية</h3>
                <p className="new-service-description">
                  بناء منصات تجارة إلكترونية قوية تلبي احتياجاتك.
                </p>
                <Button
                  variant="info"
                  onClick={() =>
                    handleModalShow(
                      "خدمة التجارة الإلكترونية: نقدم لك حلول مبتكرة لبناء منصات التجارة الإلكترونية التي تسهم في تحسين عمليات البيع عبر الإنترنت."
                    )
                  }
                  className="new-service-btn"
                >
                  تفاصيل
                </Button>
                <Button variant="success" className="new-service-btn">
                  اطلبها الآن
                </Button>
              </div>
            </Col>

            {/* Service 5 */}
            <Col md={4}>
              <div className="new-service-card">
                <img src={newImg5} alt="SEO" className="new-service-img" />
                <h3 className="new-service-title">
                  تحسين محركات البحث 
                </h3>
                <p className="new-service-description">
                  تعزيز وجودك عبر الإنترنت باستخدام استراتيجيات  الفعالة.
                </p>
                <Button
                  variant="info"
                  onClick={() =>
                    handleModalShow(
                      "خدمة تحسين محركات البحث: نقدم لك استراتيجيات  التي تساعدك في تحسين تصنيف موقعك وزيادة ظهوره في محركات البحث."
                    )
                  }
                  className="new-service-btn"
                >
                  تفاصيل
                </Button>
                <Button variant="success" className="new-service-btn">
                  اطلبها الآن
                </Button>
              </div>
            </Col>

            {/* Service 6 */}
            <Col md={4}>
              <div className="new-service-card">
                <img
                  src={newImg2}
                  alt="Cloud Services"
                  className="new-service-img"
                />
                <h3 className="new-service-title">خدمات السحابة</h3>
                <p className="new-service-description">
                  تقديم حلول سحابية آمنة وقابلة للتوسع لعملك.
                </p>
                <Button
                  variant="info"
                  onClick={() =>
                    handleModalShow(
                      "خدمة السحابة: نقدم لك حلول سحابية مرنة وآمنة تضمن لك الوصول السهل والآمن للبيانات عبر الإنترنت."
                    )
                  }
                  className="new-service-btn"
                >
                  تفاصيل
                </Button>
                <Button variant="success" className="new-service-btn">
                  اطلبها الآن
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal for service details */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الخدمة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewFullServices;
