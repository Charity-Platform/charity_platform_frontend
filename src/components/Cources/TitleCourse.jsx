import './Cources.css';
import icon1 from '../../assets/icon2.png';
import icon2 from '../../assets/icon3.png';
import icon3 from '../../assets/icon4.png';
import icon4 from '../../assets/logo.png';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const dataCard = [
  { title: 'تخصص فريد في مجالات العمل الخيري والإنساني', icon:icon1, description: ' محتوى مخصص لتطوير مهارات العاملين في القطاع الخيري، بما يتناسب مع احتياجاتهم الفعلية ومعايير المؤسسات الإنسانية' },
  { title: 'دورات تدريبية معتمدة من خبراء ومتخصصين', icon:icon2, description: ' دورات تدريبات يقدمها مستشارون معتمدون وخبراء في جميع مجالات  العمل الخيري والإنساني .' },
  { title: ' مرونة في التعلم ' ,  icon:icon3, description: ' إمكانية الوصول إلى المواد التدريبية عبر الإنترنت في أي وقت ومن أي مكان، مما يتيح للعاملين الجمع بين التعلم وأعمالهم اليومية.' },
  { title: 'تحديث مستمر للمحتوى التدريبي ', icon: icon4 , description: ' برامج تدريبية متطورة ومحدثة  باستمرار لتواكب أحدث الاتجاهات والتطورات في مجالات العمل الخيري والإنساني.' },
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
