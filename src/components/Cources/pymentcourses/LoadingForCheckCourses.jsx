import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import AnimationGif from '../../../assets/witing.gif'; // Adjust the path based on your project structure.
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const LoadingForCheckCourses = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const paymentData = searchParams.get('data'); // Get payment data from query parameters
  const { id } = useParams(); // Extract course ID from route params

console.log("the id is ",id);
console.log("Payment Data: ", paymentData); 
    const verifyPayment = async () => {
      if (!paymentData) {
        console.error('Payment data is missing:', paymentData);
        setErrorMessage('معرّف الدفع غير متوفر.');
        setLoading(false);
        return;
      }

      if (!id) {
        console.error('Course ID is missing:', id);
        setErrorMessage('معرّف الدورة غير متوفر.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_MAIN_URL}courses/checkout/${paymentData}`,
          {}, // Empty body for post request
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // Required for session-based cookies
          }
        );

        console.log('Response from API:', response);

        // Check response status for success
        if (response.status === 201) {
          setSuccess(true);
          setTimeout(() => {
            console.log('Successful payment.');
            navigate(`/thanksForCourse/${id}`); // Redirect to thank-you page
          }, 2000);
        } else {
          console.error('Unexpected response status:', response.status);
          throw new Error('حدث خطأ أثناء التحقق من الدفع.');
        }
      }catch (error) {
        console.error("Full error object: ", error);  // Log the entire error object
        if (error.response) {
          // Log response details for better debugging
          console.error("Response error data: ", error.response.data); // Log response data from the server
          console.error("Response status: ", error.response.status); // Log status code
          console.error("Response headers: ", error.response.headers); // Log response headers for more details
          setErrorMessage(error.response?.data?.message || 'حدث خطأ أثناء التحقق من الدفع.');
        } else if (error.request) {
          // This case handles when there is no response from the server
          console.error("Request error: ", error.request); // Log request details
          setErrorMessage('لا يوجد استجابة من الخادم. يرجى المحاولة مرة أخرى.');
        } else {
          console.error("Error message: ", error.message); // Log generic error message
          setErrorMessage('حدث خطأ أثناء التحقق من الدفع.'); // Fallback error message
        }
        setLoading(false);
      }
    }
  
 useEffect(() => {
     verifyPayment();  // Call the payment verification function
   }, [paymentData, navigate]); 

  // Loading state with waiting animation
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

  // Render success or error message after loading is complete
  return (
    <Container className="py-5 text-center">
      {success && <Alert variant="success">تم استلام الدفع بنجاح. شكراً لك!</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  );
};

export default LoadingForCheckCourses;
