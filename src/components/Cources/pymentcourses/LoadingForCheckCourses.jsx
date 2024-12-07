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
  const navigate = useNavigate(); // Use navigate to redirect
u
  const paymentData = searchParams.get('data');
  console.log("Payment Data: ", paymentData);  
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
  
      console.log("API Response:", response.data); // Log entire response for debugging
  
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate(`./thanksForCourse`), 2000);
      } else {
        throw new Error('حدث خطأ أثناء التحقق من الدفع.');
      }
    } catch (error) {
      console.error("Error Details:", error); // Log full error details
      if (error.response) {
        console.error("Response error data:", error.response.data);
        setErrorMessage(error.response.data?.message || 'حدث خطأ أثناء التحقق من الدفع.');
      } else {
        setErrorMessage('حدث خطأ أثناء التحقق من الدفع.');
      }
      setLoading(false);
    }
  };
  

  useEffect(() => {
    verifyPayment();  // Call the payment verification function
  }, [paymentData, navigate]);  // Dependencies ensure it's called when paymentData or navigate changes

  // Loading state: show waiting animation while the payment verification is happening
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

  // // Render success or error message once the loading is complete
  // return (
  //   <Container className="py-5 text-center">
  //     <h1 className="mb-4">شكراً على الدفع</h1>

  //     {success && <Alert variant="success">تم استلام الدفع بنجاح. شكراً لك!</Alert>}
  //     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
  //   </Container>
  // );
};

export default LoadingForCheckCourses;
