import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext'; // Adjust the import path as needed

const Nonactivemonitor = () => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { Loggedin } = useAuth(); // Use the auth context if needed

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/not-active`, {
          withCredentials: true,
        });

        const mentorsData = response.data.data; // Extract the mentors data
        const message = response.data.message; // Extract the response message
         console.log("all request data",response.data)
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

  const handleAccept = async (id) => {
    if (!id) {
      console.error('Received undefined ID:', id);
      setError('Mentor ID is undefined. Please try again.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}mentors/accept/${id}`, {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Mentor accepted successfully!');
        setMentors((prevMentors) =>
          prevMentors.filter((mentor) => mentor._id !== id)
        ); // Remove the accepted mentor from the list
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
                  <Card.Title> الاسم : {mentor.name}</Card.Title>
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
                  <Button variant="success" onClick={() => handleAccept(mentor._id)}>
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
    </Container>
  );
};

export default Nonactivemonitor;
