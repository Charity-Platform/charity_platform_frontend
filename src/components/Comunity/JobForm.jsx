import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Jobs.css';

const JobForm = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigateToJobs = () => {
    navigate('/jobs');
  };

  const handleNavigateToBlog = () => {
    navigate('/blog');
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

      {/* Job Application Form */}
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">نموذج التقديم للوظيفة</h2>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>الاسم</Form.Label>
              <Form.Control type="text" placeholder="أدخل اسمك" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>العنوان</Form.Label>
              <Form.Control type="text" placeholder="أدخل عنوانك" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>العمر</Form.Label>
              <Form.Control type="number" placeholder="أدخل عمرك" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="field">
              <Form.Label>مجال العمل</Form.Label>
              <Form.Control type="text" placeholder="أدخل مجال عملك" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>وصف العمل</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="اكتب وصفاً عن العمل الذي تود القيام به" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>صورتك الشخصية</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cv">
              <Form.Label>رفع السيرة الذاتية</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>رقم الهاتف</Form.Label>
              <Form.Control type="tel" placeholder="أدخل رقم هاتفك" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="link">
              <Form.Label>رابط (اختياري)</Form.Label>
              <Form.Control type="url" placeholder="أدخل رابطًا إذا كان لديك" />
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
