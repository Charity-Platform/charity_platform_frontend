import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Thanks = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/services'); // Redirect to /services page
    }, 2000);
  }, [navigate]); // Ensure this effect runs only once when the component mounts

  return (
    <Container className="py-5 text-center">
      <h1>شكراً لك!</h1>
      <Alert variant="success">تمت معالجة الدفع بنجاح وسوف يتم التواصل معكم قريبا نتمنى لك يوماً سعيداً!</Alert>
    </Container>
  );
};

export default Thanks;
