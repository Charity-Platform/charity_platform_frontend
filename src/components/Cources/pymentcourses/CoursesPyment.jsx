import React, { useState } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoursesPayment = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id: paymentId } = useParams(); // Extract payment ID from the URL
  const orderReferenceNumber = `ORDER_${paymentId}_${new Date().getTime()}`; // Define the order reference number here

  const handlePayment = async () => {
    setLoading(true);
    setSuccess(null);
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}courses/payment/${paymentId}`,
        { orderReferenceNumber }, // Send order reference number in the request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200 && response.data?.data) {
        window.open(response.data.data);
        setSuccess(true);
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      setSuccess(false);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during the payment.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">الدفع مقابل الخدمة</h1>
      <p className="mb-4">
        يرجى الضغط على الزر أدناه لإتمام عملية الدفع. سيتم التحقق من الدفع بمجرد إرساله. وبعد ذلك سيتم التواصل معك في أسرع وقت.
      </p>

      {success === false && <Alert variant="danger">{errorMessage}</Alert>}

      <Button
        variant="primary"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'جاري الدفع...' : 'ادفع الآن'}
      </Button>
    </Container>
  );
};

export default CoursesPayment;
