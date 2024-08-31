import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Function to add a new question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_MAIN_URL}questions`,
        { question, answer },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setQuestion('');
      setAnswer('');
      alert('تم إضافة السؤال والإجابة بنجاح');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <Container>
      <Row className="mb-4" dir="rtl">
        <h1 className="d-flex m-3">صفحة الأسئلة</h1>
        <Col md={4} className="d-flex justify-content-between align-items-center">
          <Link to="/dashboard">
            <Button variant="primary">الصفحة الرئيسية</Button>
          </Link>
          <Link to="/">
            <Button variant="primary">عرض الموقع</Button>
          </Link>
          <Link to="/allquestions">
            <Button variant="secondary">عرض جميع الأسئلة</Button>
          </Link>
        </Col>
      </Row>

      {/* Form to add a new question */}
      <Form onSubmit={handleAddQuestion} className="mb-4">
        <Form.Group controlId="formQuestion">
          <Form.Label>السؤال</Form.Label>
          <Form.Control
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="أدخل السؤال هنا"
            required
          />
        </Form.Group>
        <Form.Group controlId="formAnswer">
          <Form.Label>الإجابة</Form.Label>
          <Form.Control
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="أدخل الإجابة هنا"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2">
          إضافة
        </Button>
      </Form>
    </Container>
  );
};

export default Questions;
