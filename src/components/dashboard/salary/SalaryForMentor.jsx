import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const SalaryForMentor = () => {
    const [balance, setBalance] = useState(null); // Initialize as null to check when balance is loaded
    const [amount, setAmount] = useState(''); // Amount requested by mentor
    const [responseMessage, setResponseMessage] = useState(''); // API response message
    const [error, setError] = useState(''); // Error message
    const [loading, setLoading] = useState(false); // Loading state for the request
    const [lastRequest, setLastRequest] = useState(null); // Last deposit request data
    
    const { mentorId } = useParams();
    console.log("the id is ", mentorId); // Check this log to ensure the value is correct
  
    useEffect(() => {
      if (!mentorId) {
        // If the mentor ID is missing, log the error and return
        console.error('Mentor ID is missing');
        return;
      }
    
      // Fetch mentor's data by ID
      axios
        .get(`${import.meta.env.VITE_MAIN_URL}mentors/${mentorId}`)
        .then((response) => {
          console.log("API Response:", response.data.data.balance);
    
          // Check if the response contains the expected JSON structure
          if (response.data && response.data.data.balance !== undefined) {
            const { balance } = response.data.data;
           
            console.log("Balance:", balance);
            setBalance(balance || 0); // Set balance or default to 0
            console.log("Response from API: ", response.data)
          } else {
            console.error('Expected balance data not found');
          }
        })
        .catch((err) => {
          console.error('Error fetching mentor balance:', err);
          setError('حدث خطأ أثناء تحميل البيانات.');
        });
    }, [mentorId]);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!amount || parseFloat(amount) <= 0) {
        setError('الرجاء إدخال مبلغ السحب المطلوب.');
        return;
      }
      setError('');
      setResponseMessage('');
      setLoading(true);
  
      axios
        .post(`${import.meta.env.VITE_MAIN_URL}mentors/deposite-request`, { equity: parseFloat(amount) },{withCredentials:true})
        .then((response) => {
          setResponseMessage('تم تقديم طلب السحب بنجاح.');
          setLastRequest(response.data?.depositeRequest || null); // Safely update the lastRequest
          setAmount(''); // Clear the input
        })
        .catch((err) => {
          setError('حدث خطأ أثناء تقديم الطلب.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    };
  
    const formatNumber = (num) => {
      // Safely format number to 2 decimal places
      return num !== null && num !== undefined ? num.toFixed(2) : '0.00';
    };
  
    return (
      <Container className="py-4">
        {/* Current Balance Display */}
        <Card className="mb-4">
          <Card.Body>
            <h4 className="text-center">رصيدك الحالي</h4>
            <h2 className="text-center text-success">
              {balance !== null ? `${formatNumber(balance)} دك` : 'جارٍ التحميل...'}
            </h2>
          </Card.Body>
        </Card>
  
        {/* Request Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="depositAmount" className="mb-3">
            <Form.Label>طلب إيداع جديد</Form.Label>
            <Form.Control
              type="number"
              placeholder="أدخل مبلغ السحب المطلوب"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'جارٍ الإرسال...' : 'تقديم الطلب'}
          </Button>
        </Form>
  
        {/* API Response */}
        {responseMessage && <Alert variant="success" className="mt-4">{responseMessage}</Alert>}
  
        {/* Display Last Request */}
        {lastRequest && (
  <Card className="mt-4">
    <Card.Body>
      <h5>آخر طلب إيداع:</h5>
      <p>
        <strong>المبلغ المطلوب:</strong> 
        {lastRequest.equity !== undefined 
          ? `${formatNumber(lastRequest.equity)} دك` 
          : 'غير متاح'}
      </p>
      <p><strong>الحالة:</strong> {lastRequest.accepted ? 'تم القبول' : 'قيد الانتظار'}</p>
      <p><strong>تاريخ الطلب:</strong> 
        {lastRequest.createdAt 
          ? new Date(lastRequest.createdAt).toLocaleDateString() 
          : 'غير متاح'}
      </p>
    </Card.Body>
  </Card>
)}

      </Container>
    );
  };
  
  export default SalaryForMentor;
  