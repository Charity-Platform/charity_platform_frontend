import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contact.css'
const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Form submitted');
};

  return (
    
    <Container className="py-4 form-page">
            <Row>
                <Col className='form-contact'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>الاسم </Form.Label>
                            <Form.Control type="text" placeholder="ادخل اسمك " required />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>عنوان البريد الإلكترونى</Form.Label>
                            <Form.Control type="email" placeholder="ادخل عنوان بريدك الالكترونى" required />
                        </Form.Group>

                        <Form.Group controlId="formMessage">
                            <Form.Label>رسالتك </Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="ادخل رسالتك " required />
                        </Form.Group>

                        <Button  type="submit" className='btn-contact'>
                            إرسال 
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    
  );
}

export default ContactForm
