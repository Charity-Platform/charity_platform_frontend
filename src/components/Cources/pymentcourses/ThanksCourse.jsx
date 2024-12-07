import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ThanksCourse = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate(`/CourseVideos/${id}`);// Redirect to /services page
    }, 2000);
  }, [navigate]); // Ensure this effect runs only once when the component mounts

  return (
    <Container className="py-5 text-center">
      <h1>شكراً لك!</h1>
      <Alert variant="success">تمت معالجة الدفع بنجاح نتمنى لك  مشاهدة ممتعة !</Alert>
    </Container>
  );
};

export default ThanksCourse;
