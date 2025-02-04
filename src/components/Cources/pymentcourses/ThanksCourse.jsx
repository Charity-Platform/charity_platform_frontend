import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ThanksCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/CourseVideos/${id}`); // Redirect after 2 seconds to Course Videos page
    }, 2000);
  }, [navigate, id]);

  return (
    <Container className="py-5 text-center">
      <h1>شكراً لك!</h1>
      <Alert variant="success">تمت معالجة الدفع بنجاح نتمنى لك مشاهدة ممتعة!</Alert>
    </Container>
  );
};

export default ThanksCourse;
