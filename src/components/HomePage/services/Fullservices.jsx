import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./FullServices.css"; // New stylesheet for this page
import newImg1 from "../../../assets/code1.jpg";
import newImg2 from "../../../assets/code2.jpg";
import newImg3 from "../../../assets/code3.jpg";
import newImg4 from "../../../assets/code4.jpg";
import video6 from "../../../assets/code6.mp4";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const NewFullServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

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
          <Button variant="primary" className="new-hero-button"
           onClick={() =>
            window.open(
              "https://wa.me/0096565012126?text=أريد%20مزيد%20من%20المعلومات%20عن%20خدماتك",
              "_blank"
            )
          }
          >
            اطلب خدمة 
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
                <Button
                  variant="success"
                  className="new-service-btn"
                  onClick={() =>
                    window.open(
                      "https://wa.me/0096565012126?text=أريد%20مزيد%20من%20المعلومات%20عن%20خدماتك",
                      "_blank"
                    )
                  }
                >
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
                <Button
                  variant="success"
                  className="new-service-btn"
                  onClick={() =>
                    window.open(
                      "https://wa.me/0096565012126?text=أريد%20مزيد%20من%20المعلومات%20عن%20خدماتك",
                      "_blank"
                    )
                  }
                >
                  اطلبها الآن
                </Button>
              </div>
            </Col>

            {/* Service 3 */}
            <Col md={4}>
              <div className="new-service-card">
                <img src={newImg3} alt="UI/UX" className="new-service-img" />
                <h3 className="new-service-title">تصميم واجهات المستخدم</h3>
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
                <Button
                  variant="success"
                  className="new-service-btn"
                  onClick={() =>
                    window.open(
                      "https://wa.me/0096565012126?text=أريد%20مزيد%20من%20المعلومات%20عن%20خدماتك",
                      "_blank"
                    )
                  }
                >
                  اطلبها الآن
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* New Section After Service Cards */}
      <section className="new-image-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="new-image-section-title">
                اكتشف المزيد عن خدماتنا
              </h2>
              <p className="new-image-section-description">
                نحن هنا لمساعدتك في تحسين أعمالك وتحقيق أهدافك عبر تقنيات
                مبتكرة.
              </p>
              <Button variant="primary" className="new-image-section-btn"
               onClick={() =>
                window.open(
                  "https://wa.me/0096565012126?text=أريد%20مزيد%20من%20المعلومات%20عن%20خدماتك",
                  "_blank"
                )
              }
              >
                اتصل بنا الآن
              </Button>
            </Col>
            <Col md={6}>
              <img
                src={newImg4} // Change to your desired image path
                alt="Innovative Solutions"
                className="new-image-section-img"
              />
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
      <Footer />
    </div>
  );
};

export default NewFullServices;
