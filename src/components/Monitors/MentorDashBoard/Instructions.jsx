import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { format } from 'date-fns';

const Instructions = () => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    startDate: '',
    price: '',
    type: '',
    field: '',
    content: '',
  });

  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`, {
          withCredentials: true,
        });
        setFields(Array.isArray(response.data.document) ? response.data.document : []);
      } catch (error) {
        console.error('Error fetching fields:', error.message);
      }
    };

    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Format the date
      const formattedStartDate = format(new Date(formData.startDate), 'yyyy-MM-dd');

      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}tickets`,
        { ...formData, startDate: formattedStartDate },
        { withCredentials: true }
      );

      console.log('Form submitted successfully', response.data);
      toast.success('تم إضافة استشارة جديدة بنجاح');

      // Reset the form
      setFormData({
        title: '',
        duration: '',
        startDate: '',
        price: '',
        type: '',
        field: '',
        content: '',
      });
    } catch (error) {
      console.error('Submission error:', error.response ? error.response.data : error.message);
      toast.error('حدث خطأ أثناء إضافة الاستشارة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5" dir="rtl">
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
              {fields.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
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
          <Form.Group as={Col} md="6" controlId="formStartDate">
            <Form.Label>تاريخ البداية</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> &nbsp; جارٍ الإرسال...
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
