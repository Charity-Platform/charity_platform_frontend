import './service.css';
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const Card_services = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cardData = [
    { id: 1, title: 'جمعيات خيرية ', description: ' تأسيس جمعيات خيرية يعد خطوة هامة لخدمة المجتمع ودعم الفئات المحتاجة. تشمل الخطوات الأساسية لتأسيس جمعية خيرية تحديد الهدف الرئيسي والرسالة المؤسسية، ', imageUrl: 'https://www.adobe.com/acrobat/hub/media_179a6d21d8434721427c57f5ebbedcd094dc11bb1.jpeg?width=750&format=jpeg&optimize=medium' },
    { id: 2, title: 'تدريب مستشارين ', description: ' تأسيس جمعيات خيرية يعد خطوة هامة لخدمة المجتمع ودعم الفئات المحتاجة. تشمل الخطوات الأساسية لتأسيس جمعية خيرية تحديد الهدف الرئيسي والرسالة المؤسسية، ', imageUrl: 'https://www.adobe.com/acrobat/hub/media_179a6d21d8434721427c57f5ebbedcd094dc11bb1.jpeg?width=750&format=jpeg&optimize=medium' },
    { id: 3, title: 'تـأسيس جمعيات خيرية', description: ' تأسيس جمعيات خيرية يعد خطوة هامة لخدمة المجتمع ودعم الفئات المحتاجة. تشمل الخطوات الأساسية لتأسيس جمعية خيرية تحديد الهدف الرئيسي والرسالة المؤسسية، ', imageUrl: 'https://www.adobe.com/acrobat/hub/media_179a6d21d8434721427c57f5ebbedcd094dc11bb1.jpeg?width=750&format=jpeg&optimize=medium' },
    { id: 3, title: 'تحسين وتجديد هيكل الشركة', description: ' تأسيس جمعيات خيرية يعد خطوة هامة لخدمة المجتمع ودعم الفئات المحتاجة. تشمل الخطوات الأساسية لتأسيس جمعية خيرية تحديد الهدف الرئيسي والرسالة المؤسسية، ',  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREfIgYRTi-RF0rIh4OQOKCNOyKLsgPM5HG5eOx17yT81mG5I5r9TcwqfaiVSOKwnyzdFY&usqp=CAU'},
    

    // Add more cards as needed
  ];

  return (
    <div className='card-total' dir='rtl'>
   <Container>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {cardData.map((card) => (
          <Col key={card.id}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} className='card-service'>
              {/* <Card.Img variant="top" src={card.imageUrl} className='image-card' /> */}
              <Card.Body>
                <Card.Title className="mb-0" >{card.title}</Card.Title>
                <Card.Text className="text-muted mb-2">{card.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                 
                  <div className='button-card'>
                  <Button variant="outline-primary"  onClick={handleShow} className="button-card custom-background">
                  تفاصيل 
                   </Button>
                    <button variant="primary" style={{ backgroundColor: '#07a79d', border: 'none' }} className="ml-2 btn-service">طلب إستشارة </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الاستشارة </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        تأسيس جمعيات خيرية يعد خطوة هامة لخدمة المجتمع ودعم الفئات المحتاجة. تشمل الخطوات الأساسية لتأسيس جمعية خيرية تحديد الهدف الرئيسي والرسالة المؤسسية، وإعداد النظام الأساسي واللوائح التنظيمية، بالإضافة إلى تسجيل الجمعية لدى الجهات المختصة لضمان شفافية الأعمال واستمرارية العمل الخيري.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق 
          </Button>
          <Button variant="primary" onClick={handleClose} style={{ backgroundColor: '#07a79d', border: 'none' }}>
            طلب الإستشارة 
          </Button>
        </Modal.Footer>
      </Modal>
      <div> <h2><br/></h2></div>
         
    </Container>
 
   
    </div>
  )
}

export default Card_services
