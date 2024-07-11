import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/2.jpg';
import img4 from '../../assets/img-2.jpeg';

const cardData = [
  { title: 'تنمية بشرية ', icon:img1, description: 'تنمية مهارات العمل الجماعى ' },
  { title: 'تنظيم الوقت ', icon:img2, description: 'تطوير الذات والمهارات ' },
  { title: 'إدارة الموارد', icon:img3, description: 'تطوير البثيئة العمليه ' },
  { title: 'العمل الخيرى ', icon:img3, description: 'تخطيط وتنفيذ المشاريع ' },
  { title: 'العمل الخيرى ', icon: img3, description: 'تطوير البثيئة العمليه ' },
  { title: 'العمل الخيرى ', icon: img3, description: 'تطوير البثيئة العمليه ' },
];
const CardCources = () => {
    return (
        
        <Container className="py-5">
        <div className='heading-title'>
            <h1>الكورسات التدريبية  </h1>
           </div>
          <Row className="justify-content-center">
            {cardData.map((card, index) => (
              <Col md={4} lg={3} key={index} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Card.Img variant="top" src={card.icon}  alt={card.title} className='card-img'/>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Button className="btn btn-course">طلب الدورة </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )
}

export default CardCources
