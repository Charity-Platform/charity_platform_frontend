import React, { useState } from 'react';
import { Container, Form, Button, ProgressBar, Card } from 'react-bootstrap';
import './Blog.css';
import { Link } from 'react-router-dom';

const FormBlog = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone:'',
      age: '',
      address: '',
      job:''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const nextStep = () => {
      setStep(step + 1);
    };
  
    const prevStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };
  
    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <Form className='FormBlog '> 
              <Form.Group controlId="formName">
                <Form.Label>الأسم </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك "
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>البريد الإلكترونى </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكترونى "
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label> الهاتف المحمول  </Form.Label>
                <Form.Control
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكترونى "
                />
              </Form.Group>
              <Button variant="primary" onClick={nextStep}>
                التالى 
              </Button>
            </Form>
          );
        case 2:
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formAge">
                <Form.Label>العمر </Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="أدخل عمرك"
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>عنوان البلد</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="أدخل عنوان بلد الإقامة "
                />
              </Form.Group>
              <Button variant="secondary" onClick={prevStep}>
                السابق 
              </Button>
              <Link to='/comunity'>
              <Button variant="primary" type="submit" className="ml-2">
                إرسال الطلب 
              </Button>
              </Link>
              
            </Form>  
       
          );
        default:
          return null;
      }
    };
  
    const progressPercentage = step === 1 ? 50 : 100;
  
    return (
      <Container className="mt-5">
        <Card className="p-4">
          <Card.Title className="text-center">برجاء إستكمال الطلب للإنضمام للمجتمع الخيرى </Card.Title>
          <ProgressBar now={progressPercentage} className="mb-4" />
          {renderStep()}
        </Card>
      </Container>
   
    );
   
  };

export default FormBlog
