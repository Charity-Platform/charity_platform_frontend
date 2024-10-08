import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mentor.css';

const Activemonitor = () => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null); // State to store selected mentor details
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`, {
          withCredentials: true,
        });
        console.log('API Response:', response.data);

        const mentorsData = response.data.data;
        if (Array.isArray(mentorsData)) {
          setMentors(mentorsData);
        } else {
          setError('Invalid response format.');
        }
      } catch (err) {
        console.error('Error fetching accepted mentors:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Failed to fetch accepted mentors.');
      }
    };

    fetchAcceptedMentors();
  }, []);

  // Function to handle opening the modal and fetching mentor details
  const handleShowDetails = async (mentorId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${mentorId}`, {
        withCredentials: true,
      });
      setSelectedMentor(response.data.data); // Set the detailed mentor data
      setShowModal(true); // Show the modal
    } catch (err) {
      console.error('Error fetching mentor details:', err.response ? err.response.data : err.message);
      setError('Failed to fetch mentor details.');
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMentor(null);
  };

  return (
    <Container className="mt-5" dir="rtl">
      <Button variant="primary" onClick={() => navigate('/dashboard')} className="mb-4">
        الصفحة الرئيسية
      </Button>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {mentors.length > 0 ? (
          mentors.map(mentor => (
            <Col xs={4} key={mentor._id} className="mb-4">
              <Card>
                    {/* Display mentor image */}
                    {mentor.image && (
                  <Card.Img variant="top" src={mentor.image} alt={mentor.name} style={{ height: '100px',width:'100px', objectFit: 'cover',borderRadius:'50%' }} />
                )}
                <Card.Body>
                  <Card.Title>الاسم: {mentor.name}</Card.Title>
                  <Card.Text>
                    <strong>البريد الإلكتروني:</strong> {mentor.email}<br />
                    <strong>رقم الهاتف:</strong> {mentor.phone}<br />
                    <strong>التخصص:</strong> {mentor.field}<br />
                  </Card.Text>
                  {/* Button to fetch and show mentor details */}
                  <Button variant="info" onClick={() => handleShowDetails(mentor._id)}>
                    عرض التفاصيل
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>لا يوجد مستشارون مقبولون.</p>
        )}
      </Row>

      {/* Modal to display mentor details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل المستشار</Modal.Title>
        </Modal.Header>
        <Modal.Body dir='rtl'>
          {selectedMentor ? (
            <>
              <p><strong>الاسم:</strong> {selectedMentor.name}</p>
              <p><strong>البريد الإلكتروني:</strong> {selectedMentor.email}</p>
              <p><strong>رقم الهاتف:</strong> {selectedMentor.phone}</p>
              <p><strong>التخصص:</strong> {selectedMentor.field}</p>
              <p><strong> العنوان: </strong> {selectedMentor.address}</p>
              <p><strong>تاريخ الميلاد:</strong> {new Date(selectedMentor.birthdate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>معلومات إضافية:</strong> {selectedMentor.hourePrice}</p>
              <div className="social-links">
                <p><strong>روابط وسائل التواصل:</strong></p>
                {selectedMentor.socialMedia?.facebook && (
                  <a href={selectedMentor.socialMedia.facebook} target="_blank" rel="noopener noreferrer" > 
                    Facebook
                  </a>
                )}
                {selectedMentor.socialMedia?.twitter && (
                  <a href={selectedMentor.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
                {selectedMentor.socialMedia?.linkedin && (
                  <a href={selectedMentor.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {selectedMentor.socialMedia?.instagram && (
                  <a href={selectedMentor.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
              </div>

            </>
          ) : (
            <p>جاري تحميل التفاصيل...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Activemonitor;
