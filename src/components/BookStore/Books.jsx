import './Books.css';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';import bookImage from '../../assets/1.jpg'; // Replace with your actual image path
import shippingIcon from '../../assets/1.jpg'; // Replace with your actual icon path
import moneyBackIcon from '../../assets/1.jpg'; // Replace with your actual icon path
import cashIcon from '../../assets/2.jpg'; // Replace with your actual icon path
import supportIcon from '../../assets/4.jpg'; // Replace with your actual icon path

const Books = () => {
  return (
    <Container fluid className="py-5">
    <Row className="align-items-center mb-5">
      <Col md={6}>
        <h1>H.G. Wells</h1>
        <h2>Empire Of The Ants</h2>
        <p>Cover up front of book and leave summary</p>
        <Button variant="success">Shopping Now</Button>
      </Col>
      <Col md={6}>
        <Carousel>
          <Carousel.Item>
            <img src={bookImage} alt="Empire of the Ants" className="img-fluid" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={bookImage} alt="Empire of the Ants" className="img-fluid" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={bookImage} alt="Empire of the Ants" className="img-fluid" />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
    <Row className="text-center">
      <Col md={3}>
        <Card className="p-3">
          <Card.Img variant="top" src={shippingIcon} alt="Free Shipping Item" />
          <Card.Body>
            <Card.Title>Free Shipping Item</Card.Title>
            <Card.Text>Orders over $500</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="p-3">
          <Card.Img variant="top" src={moneyBackIcon} alt="Money Back Guarantee" />
          <Card.Body>
            <Card.Title>Money Back Guarantee</Card.Title>
            <Card.Text>100% money back</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="p-3">
          <Card.Img variant="top" src={cashIcon} alt="Cash On Delivery" />
          <Card.Body>
            <Card.Title>Cash On Delivery</Card.Title>
            <Card.Text>Lorem ipsum dolor amet</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="p-3">
          <Card.Img variant="top" src={supportIcon} alt="Help & Support" />
          <Card.Body>
            <Card.Title>Help & Support</Card.Title>
            <Card.Text>Call us: +0123.4567.89</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default Books
