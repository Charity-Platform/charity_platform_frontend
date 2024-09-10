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
        //console.log('API Response:', response.data); // Log the response
        
        // Assuming response.data is { data: [...] }
        const mentorsData = response.data.data; // Extract the mentors data
        if (Array.isArray(mentorsData)) {
          setMentors(mentorsData);
        } else {
          setError('Invalid response format.');
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
  
    console.log(`Attempting to accept mentor with ID: ${id}`); // Log ID being processed
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}mentors/accept/${id}`, {}, {
        withCredentials: true,
      });
      console.log('API Response:', response); // Log the API response
  
      if (response.status === 200) {
        alert('Mentor accepted successfully!');
        setMentors(mentors.filter(mentor => mentor.id !== id)); // Remove the accepted mentor from the list
      } else {
        setError(`Failed to accept mentor. Status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error accepting mentor:', err.response ? err.response.data : err.message); // Log detailed error
      setError('Failed to accept mentor.');
    }
  };
  
  
  
  
  

  return (
    <Container className="mt-5" dir='rtl'>
      <Button variant="primary" onClick={() => navigate('/dashboard')} className="mb-4">
        الصفحة الرئيسية
      </Button>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {mentors.length > 0 ? (
          mentors.map(mentor => (
            <Col xs={6} key={mentor.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title> الاسم : {mentor.name}</Card.Title>
                  <Card.Text>
                    <strong>البريد الإلكترونى :</strong> {mentor.email}<br />
                    <strong>رقم الهاتف :</strong> {mentor.phone}<br />
                    <strong>التخصص :</strong> {mentor.field}<br />
                    <strong>معلومات اضافية :</strong> {mentor.description}<br />
                  </Card.Text>
                  <Button variant="success" onClick={() => handleAccept(mentor._id)} key={mentor._id}>
                    قبول المستشار فى المنصة
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No mentors available.</p>
        )}
      </Row>
    </Container>
  );
};

export default Nonactivemonitor;
