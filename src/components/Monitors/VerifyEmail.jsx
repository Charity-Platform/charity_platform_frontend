import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';


const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    // Get email from state, or handle the case if it's undefined
    const email = location.state?.email || ''; 
  
    // Check if email is passed correctly
    useEffect(() => {
      console.log('Email received for verification:', email);
    }, [email]);
  
    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        
        if (!email || !verificationCode) {
          setErrorMessage('Email or verification code is missing.');
          return;
        }
        
        try {
            // Include the email and verificationCode in the request payload
            const response = await axios.post(
              `${import.meta.env.VITE_MAIN_URL}auth/verify-email`,
              {
                email: email,  // Pass email here
                emailVerifyCode: verificationCode  // Pass verification code here
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
        
          console.log('Response:', response.data);
        
          setSuccessMessage('Email verified successfully!');
          setErrorMessage('');
          navigate('/'); // Redirect after successful verification
        } catch (error) {
          // Log error details
          console.error('Error details:', error.response?.data || error.message);
          setErrorMessage('Verification failed. Please check your code.');
          setSuccessMessage('');
        }
    };
    
      
  
    return (
      <Container className="verify-email">
        <Card className="p-4 shadow">
          <h2 className="text-center mb-4">Verify Your Email</h2>
          <p className="text-center">A verification code has been sent to your email: {email}</p>
          <Form onSubmit={handleVerifyEmail}>
            <Form.Group controlId="formVerificationCode" className="mb-3">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter your verification code"
                required
              />
            </Form.Group>
  
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
  
            <Button variant="primary" type="submit" className="w-100">
              Verify Email
            </Button>
          </Form>
        </Card>
      </Container>
    );
}

export default VerifyEmail
