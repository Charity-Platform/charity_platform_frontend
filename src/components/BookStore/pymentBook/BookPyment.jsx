import React, { useState } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookPyment = () => {
  const [loading, setLoading] = useState(false); // To handle loading state
  const [success, setSuccess] = useState(null); // To display success or failure
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages
  const { id: paymentId } = useParams(); // Extract payment ID from the URL

  const handlePayment = async () => {
    setLoading(true);
    setSuccess(null);
    setErrorMessage('');
  
    try {
      // Retrieve the token from storage (adjust according to your project setup)
      const token = localStorage.getItem('authToken'); // Example: Token stored in localStorage
  
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}books/payment/${paymentId}`,
        {}, // Request body (if required, include here)
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
          withCredentials: true, // Include this if using cookies for authentication
        }
      );
  
      if (response.status === 200 && response.data?.data) {
        console.log(response.data);
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
      <h1 className="mb-4">برجاء استكمال عملية الدفع   </h1>
      <p className="mb-4">
         يرجى الضغط على الزر أدناه لإتمام عملية الدفع. سيتم التحقق من الدفع بمجرد إرساله.  
      </p>

      {/* {loading && (
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )} */}

      {/* {success === true && <Alert variant="success">تم الدفع بنجاح!</Alert>} */}
      {success === false && <Alert variant="danger">{errorMessage}</Alert>}

      <Button
        variant="primary"
        onClick={handlePayment}
        disabled={loading} // Disable the button while loading
      >
        {loading ? 'جاري الدفع...' : 'ادفع الآن'}
      </Button>
    </Container>
  );
};

export default BookPyment;
