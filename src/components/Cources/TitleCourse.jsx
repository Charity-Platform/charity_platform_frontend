import './Cources.css';
import icon1 from '../../assets/icon2.png';
import icon2 from '../../assets/icon3.png';
import icon3 from '../../assets/icon4.png';
import icon4 from '../../assets/logo.png';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const dataCard = [
  { title: 'تنمية بشرية ', icon:icon1, description: 'تنمية مهارات العمل الجماعى ' },
  { title: 'تنظيم الوقت ', icon:icon2, description: 'تطوير الذات والمهارات ' },
  { title: 'إدارة الموارد', icon:icon3, description: 'تطوير البثيئة العمليه ' },
  { title: 'العمل الخيرى ', icon: icon4 , description: 'تخطيط وتنفيذ المشاريع ' },
//   { title: 'MEDIA COURSES', icon: 'path-to-icon', description: 'Description here' },
//   { title: 'USER INTERFACE', icon: 'path-to-icon', description: 'Description here' },
];

const TitleCourse = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        {dataCard.map((card, index) => (
          <Col md={4} lg={2} key={index} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Img variant="top" src={card.icon}  alt={card.title} className='icon-img'/>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                {/* <Button className="btn btn-primary">Discover Courses</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TitleCourse
