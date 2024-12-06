import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Jobs.css';

const JobForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    field: '',
    description: '',
    image: null,
    cv: null,
    phone: '',
    link: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Navigation handlers
  const handleNavigateToJobs = () => {
    navigate('/jobs');
  };

  const handleNavigateToBlog = () => {
    navigate('/blog');
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name ', formData.name);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('age', formData.age);
    formDataToSubmit.append('field', formData.field);
    formDataToSubmit.append('depDescription', formData.depDescription);
    formDataToSubmit.append('image', formData.image);  // Check this field name
    formDataToSubmit.append('pdf', formData.pdf);  // Check this field name
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('link', formData.link);
    

    try {
      const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}employee`, formDataToSubmit);
      setSuccess('تم إرسال البيانات بنجاح!');
      setFormData({
        name: '',
        address: '',
        age: '',
        field: '',
        description: '',
        image: null,
        cv: null,
        phone: '',
        link: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      setError(error.response?.data?.message || 'حدث خطأ أثناء إرسال البيانات. حاول مرة أخرى.');
    }
    
  };

  return (
    <Container className="job-form-container mt-5">
      {/* Navigation Buttons */}
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <Button variant="primary" onClick={handleNavigateToJobs} className="mx-2">
            عرض الوظائف المتاحة
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleNavigateToBlog} className="mx-2">
            الرئيسية 
          </Button>
        </Col>
      </Row>

      {/* Form submission status */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Job Application Form */}
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">نموذج التقديم للوظيفة</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>الاسم</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="أدخل اسمك"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="أدخل عنوانك"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>العمر</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="أدخل عمرك"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="field">
              <Form.Label>مجال العمل</Form.Label>
              <Form.Control
                type="text"
                name="field"
                placeholder="أدخل مجال عملك"
                value={formData.field}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>وصف العمل</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="اكتب وصفاً عن العمل الذي تود القيام به"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>صورتك الشخصية</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cv">
              <Form.Label>رفع السيرة الذاتية</Form.Label>
              <Form.Control
                type="file"
                name="cv"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>رقم الهاتف</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="أدخل رقم هاتفك"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="link">
              <Form.Label>رابط (اختياري)</Form.Label>
              <Form.Control
                type="url"
                name="link"
                placeholder="أدخل رابطًا إذا كان لديك"
                value={formData.link}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              إرسال
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JobForm;
