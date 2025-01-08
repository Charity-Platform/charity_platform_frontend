import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const Instructions = () => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    startDate: '',
    price: '',
    day: '',
    type: '',
    field: '',
    content: ''
  });

  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`, {
          withCredentials: true,
        });
        if (Array.isArray(response.data.document)) {
          setFields(response.data.document);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}tickets`, formData, {
        withCredentials: true,
      });
      console.log('Form submitted successfully', response.data);
      toast.success("تم إضافة استشارة جديدة بنجاح");
      setFormData({
        title: '',
        duration: '',
        startDate: '',
        price: '',
        day: '',
        type: '',
        field: '',
        content: ''
      });
    } catch (error) {
      console.error('There was an error submitting the form', error.response ? error.response.data : error.message);
      toast.error("حدث خطأ أثناء إضافة الاستشارة"); // Error toast message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <Container className="py-5" dir='rtl'>
      <h2 className="text-center mb-4">إنشاء استشارة جديدة</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formTitle">
            <Form.Label>عنوان الاستشارة</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="أدخل عنوان الاستشارة"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formDuration">
            <Form.Label>المدة (بالدقائق)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="أدخل مدة الاستشارة"
              required
            />
          </Form.Group>
        </Row>

      

        <Row className="mb-3">
        
        <Form.Group as={Col} md="6" controlId="formPrice">
            <Form.Label>السعر (بالدينار)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="أدخل سعر الاستشارة"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formType">
            <Form.Label>نوع الاستشارة</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">اختر نوع الاستشارة</option>
              <option value="online">عن بُعد</option>
              <option value="offline">حضورياً</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formField">
            <Form.Label>التخصص</Form.Label>
            <Form.Select name="field" value={formData.field} onChange={handleChange} required>
              <option value="">اختر التخصص</option>
              {fields.map((field) => (
                <option key={field.id} value={field.name}>
                  {field.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formContent">
            <Form.Label>معلومات إضافية</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="أدخل أية معلومات إضافية"
              rows={3}
            />
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formContent">
            <Form.Label> تاريخ البداية</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formContent">
            <Form.Label> اليوم </Form.Label>
            <Form.Control
              type="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              placeholder="أدخل يوم الاستشارة"
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> {/* Loading spinner */}
              &nbsp; جارٍ الإرسال...
            </>
          ) : (
            'إضافة الاستشارة'
          )}
        </Button>
      </Form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
    </Container>
  );
};

export default Instructions;
