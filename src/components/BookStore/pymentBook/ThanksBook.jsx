import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ThanksBook = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the book ID from the URL

  useEffect(() => {
console.log('ThankBook ID:', id);
    setTimeout(() => {
      navigate(`/BookView/${id}`); // Redirect to the BookView page
    }, 2000);
  }, [navigate, id]);

  return (
    <Container className="py-5 text-center">
      <h1>شكراً لك!</h1>
      <Alert variant="success">تمت معالجة الدفع بنجاح ونتمنى لك يوماً سعيداً!</Alert>
    </Container>
  );
};

export default ThanksBook;
