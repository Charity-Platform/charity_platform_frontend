import React, { useState } from 'react';
import { Form, Button, Alert, Container, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFields = () => {
  const [fieldName, setFieldName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const Navigate =useNavigate();
  // Handle form submission to add a new field
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the field name is entered
    if (!fieldName) {
      setErrorMessage('يجب إدخال اسم المجال');
      setSuccessMessage('');
      return;
    }

    try {
      // Make POST request to add the new field
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}fields`,  // Replace with your actual API endpoint
        { name: fieldName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Response:', response.data);

      // Reset form after successful API call
      setFieldName('');
      setErrorMessage('');
      setSuccessMessage('تم إضافة المجال بنجاح!');
      setShowToast(true);  // Show the Toast on success
    } catch (error) {
      console.error('Error adding field:', error);
      setSuccessMessage('');
      setErrorMessage('حدث خطأ أثناء إضافة المجال. حاول مرة أخرى لاحقاً');
    }
  };

  return (
    <Container className="mt-5"dir='rtl'>
        <Button className='mb-5' onClick={()=>Navigate('/dashboard/AllFields')}>الذهاب الى كل المجالات</Button>
      <h2>إضافة مجال جديد</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fieldName" className="mb-3">
          <Form.Label>اسم المجال</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل اسم المجال"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Button variant="primary" type="submit">
          إضافة المجال
        </Button>
      </Form>

      {/* Toast notification for success */}
      <ToastContainer position="top-end">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body style={{color:'#fff'}}>تم إضافة المجال بنجاح!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AddFields;
