import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({ id: '', question: '', answer: '' });

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}questions`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setQuestions(Array.isArray(response.data.document) ? response.data.document : response.data.questions || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Delete a question
  const handleDelete = async (id) => {
    if (!id) {
      console.error('Delete operation failed: Invalid id.');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}questions/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      fetchQuestions(); // Refresh the list after deleting
      alert("تم حذف العنصر بنجاح ");
    } catch (error) {
      console.error('Error deleting question:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
    }
  };

  const handleShowUpdate = (q) => {
    if (q && q._id) {
      setCurrentQuestion(q);
      setShowUpdateModal(true);
    } else {
      console.error('Question does not have a valid _id:', q);
    }
  };
  
  // Update question
  const handleUpdateQuestion = async () => {
    if (!currentQuestion._id) {
      console.error('Current question _id is undefined:', currentQuestion);
      alert('Unable to update question due to missing _id.');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MAIN_URL}questions/${currentQuestion._id}`,
        {
          question: currentQuestion.question,
          answer: currentQuestion.answer,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setShowUpdateModal(false);
      fetchQuestions(); // Refresh the list after updating
      alert("تم تعديل السؤال والاجابة بنجاح");
    } catch (error) {
      console.error('Error updating question:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
    }
  };
  

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Container>
         <Row className="mb-5" dir="rtl">
        <h1 className="d-flex m-3">صفحة الأسئلة</h1>
        <Col md={4} className="d-flex justify-content-between align-items-center">
          <Link to="/dashboard">
            <Button variant="primary">الصفحة الرئيسية</Button>
          </Link>
          <Link to="/">
            <Button variant="primary">عرض الموقع</Button>
          </Link>
          <Link to="/questions">
            <Button variant="secondary"> إضافة سؤال </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {questions.length > 0 ? (
          questions.map((q) => (
            <Col md={4} key={q._id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{q.question}</Card.Title>
                  <Card.Text>{q.answer}</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(q._id)}>
                    حذف
                  </Button>
                  <Button
                    variant="warning"
                    className="ms-2"
                    onClick={() => handleShowUpdate(q)}
                  >
                    تعديل
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">جارى التحميل ...... </p>
        )}
      </Row>

      {/* Modal for updating question */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تحديث السؤال</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updateQuestion">
              <Form.Label>السؤال</Form.Label>
              <Form.Control
                type="text"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="updateAnswer">
              <Form.Label>الإجابة</Form.Label>
              <Form.Control
                type="text"
                value={currentQuestion.answer}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, answer: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleUpdateQuestion}>
            حفظ التغييرات
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllQuestions;