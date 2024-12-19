import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoursesPayment = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id: paymentId } = useParams(); // Extract payment ID from the URL

  // Ensure `paymentId` exists
  if (!paymentId) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">معرّف الدفع غير متوفر.</Alert>
      </Container>
    );
  }

  const orderReferenceNumber = `ORDER_${paymentId}_${new Date().getTime()}`;

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

      if (response.status === 200 && response.data?.data) {
        window.open(response.data.data); // Open the payment link
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
      <h1 className="mb-4"> برجاء استكمال عملية الدفع  </h1>
      <p className="mb-4">
        يرجى الضغط على الزر أدناه لإتمام عملية الدفع. سيتم التحقق من الدفع بمجرد إرساله. وبعد ذلك سيتم التواصل معك في أسرع وقت.
      </p>

      {success === false && <Alert variant="danger">{errorMessage}</Alert>}
      {success === true && <Alert variant="success">تم إرسال الدفع بنجاح!</Alert>}

      <Button variant="primary" onClick={handlePayment} disabled={loading}>
        {loading ? 'جاري الدفع...' : 'ادفع الآن'}
      </Button>
    </Container>
  );
};

export default CoursesPayment;
