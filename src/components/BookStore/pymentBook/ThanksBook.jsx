import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ThanksBook = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the `id` from the URL

  useEffect(() => {
    setTimeout(() => {
      navigate(`/BookView/${id}`); // Navigate to the BookView page with the `id`
    }, 2000);
  }, [navigate, id]);

  return (
    <Container className="py-5 text-center">
      <h1>شكراً لك!</h1>
      <Alert variant="success">
        تمت معالجة الدفع بنجاح و نتمنى لك يوماً سعيداً!
      </Alert>
    </Container>
  );
};

export default ThanksBook;
