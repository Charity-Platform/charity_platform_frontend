import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import AnimationGif from '../../../assets/witing.gif'; // Adjust the path based on your project structure.
import { useSearchParams, useNavigate } from 'react-router-dom';

const LoadingForCheckCourses = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const paymentData = searchParams.get('data'); // Get payment data from query parameters

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentData) {
        setErrorMessage('معرّف الدفع غير متوفر.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_MAIN_URL}courses/checkout/${paymentData}`,
          {},
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
 console.log(response.data);
        if (response.status === 200 || response.status === 201) {
         
          setSuccess(true);
          setTimeout(() => {
            navigate(`/thank-you`); // Redirect after 2 seconds
          }, 2000);
        } else {
          throw new Error('حدث خطأ أثناء التحقق من الدفع.');
        }
      } catch (error) {
        console.error("Error during payment verification:", error); // Log the error for debugging
        if (error.response) {
          setErrorMessage(error.response?.data?.message || 'حدث خطأ أثناء التحقق من الدفع.');
        } else if (error.request) {
          setErrorMessage('لا يوجد استجابة من الخادم. يرجى المحاولة مرة أخرى.');
        } else {
          setErrorMessage('حدث خطأ أثناء التحقق من الدفع.');
        }
      }
      setLoading(false); // Ensure loading state is turned off after verification
    };

    verifyPayment();
  }, [paymentData, navigate]);

  if (loading) {
    return (
      <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <Row className="text-center">
          <Col>
            <img
              src={AnimationGif}
              alt="شخصية متحركة"
              className="mb-4"
              style={{ width: '150px', height: '150px' }}
            />
            <h2 style={{ fontWeight: 'bold', color: '#333' }}>يرجى الانتظار</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              نحن نتحقق من عملية الدفع الخاصة بك. قد تستغرق هذه العملية بضع لحظات.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-center">
      {success && <Alert variant="success">تم استلام الدفع بنجاح. شكراً لك!</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  );
};

export default LoadingForCheckCourses;
