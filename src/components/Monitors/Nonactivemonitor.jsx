import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext'; // Adjust the import path as needed

const Nonactivemonitor = () => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [selectedMentorId, setSelectedMentorId] = useState(null); // To store the mentor's ID when choosing
  const [fees, setFees] = useState(''); // Store the fee input by admin
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/not-active`, {
          withCredentials: true,
        });

        const mentorsData = response.data.data; // Extract the mentors data
        const message = response.data.message; // Extract the response message
        console.log("all request data", response.data);
        if (Array.isArray(mentorsData) && mentorsData.length > 0) {
          setMentors(mentorsData);
        } else if (message) {
          setError(message); // Set the response message as the error
        } else {
          setError('No mentors found.');
        }
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to fetch mentors.');
      }
    };

    fetchMentors();
  }, []);

  const handleAccept = async () => {
    if (!selectedMentorId || fees === '') {
      setError('Please select a mentor and enter a fee.');
      return;
    }

    try {
      // Send the mentor ID and fee in the request
      const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}mentors/accept/${selectedMentorId}`, {
        fees, // Send fees in the request body
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Mentor accepted successfully!');
        // Close the modal and clear state
        setShowModal(false);
        setFees('');
        // Remove the accepted mentor from the list
        setMentors(prevMentors => prevMentors.filter(mentor => mentor._id !== selectedMentorId));
      } else {
        setError(`Failed to accept mentor. Status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error accepting mentor:', err.response ? err.response.data : err.message);
      setError('Failed to accept mentor.');
    }
  };

  return (
    <Container className="mt-5" dir="rtl">
      <Button variant="primary" onClick={() => navigate('/dashboard')} className="mb-4">
        الصفحة الرئيسية
      </Button>

      {error && <p className="text-danger text-center">{error}</p>}

      <Row>
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <Col xs={6} key={mentor._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>الاسم : {mentor.name}</Card.Title>
                  <Card.Text>
                    <strong>البريد الإلكترونى :</strong> {mentor.email}
                    <br />
                    <strong>رقم الهاتف :</strong> {mentor.phone}
                    <br />
                    <strong>التخصص :</strong> {mentor.field}
                    <br />
                    <strong>معلومات اضافية :</strong> {mentor.description}
                    <br />
                  </Card.Text>
                  <Button variant="success" onClick={() => {
                    setSelectedMentorId(mentor._id);
                    setShowModal(true);
                  }}>
                    قبول المستشار فى المنصة
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !error && <p className="text-center text-muted">لا يوجد مستشارين غير نشطين.</p>
        )}
      </Row>

      {/* Modal to enter fees for accepting mentor */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>إدخال نسبة الخصم للمستشار</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFees">
              <Form.Label>  نسبة الخصم المراد خصمها مع كل عملية </Form.Label>
              <Form.Control
                type="number"
                placeholder=" أدخل نسبة الخصم"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
              <Form.Text className="text-muted">أدخل نسبة الخصم كنسبة مئوية (0-100).</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            قبول
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Nonactivemonitor;
