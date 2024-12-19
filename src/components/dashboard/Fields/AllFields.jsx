import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllFields = () => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalField, setModalField] = useState(null); // Store the field to be edited or null if adding a new field
  const [fieldName, setFieldName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
const Navigate =useNavigate();
  // Fetch fields when the component mounts
  useEffect(() => {
    fetchFields();
  }, []);

  // Fetch all fields from the API
  const fetchFields = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`);
      setFields(response.data.document);  // Assuming the response data is an array of fields
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  // Handle modal for adding or editing fields
  const handleShowModal = (field = null) => {
    setModalField(field);  // Pass field for editing, null for new field
    setFieldName(field ? field.name : '');  // Set field name for editing or new field
    setShowModal(true);
  };

  // Handle field submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fieldName) {
      setErrorMessage('يجب إدخال اسم المجال');
      setSuccessMessage('');
      return;
    }

    try {
      let response;
      if (modalField) {
        // Update the existing field
        response = await axios.put(
          `${import.meta.env.VITE_MAIN_URL}fields/${modalField._id}`,  // Update using the field ID
          { name: fieldName },
          {withCredentials:true}
        );
        setSuccessMessage('تم تحديث المجال بنجاح!');
      } else {
        // Add a new field
        response = await axios.post(
          `${import.meta.env.VITE_MAIN_URL}fields`,
          { name: fieldName }
        );
        setSuccessMessage('تم إضافة المجال بنجاح!');
      }
      setErrorMessage('');
      fetchFields(); // Fetch updated list of fields
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error adding/updating field:', error);
      setSuccessMessage('');
      setErrorMessage('حدث خطأ أثناء إضافة أو تحديث المجال. حاول مرة أخرى لاحقاً');
    }
  };

  // Handle field deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}fields/${id}`,{withCredentials:true});
      setSuccessMessage('تم حذف المجال بنجاح!');
      fetchFields();  // Refresh the fields list
    } catch (error) {
      console.error('Error deleting field:', error);
      setSuccessMessage('');
      setErrorMessage('حدث خطأ أثناء حذف المجال. حاول مرة أخرى لاحقاً');
    }
  };

  return (
    <Container className="mt-5" dir='rtl'>
        <Button className='mb-5' onClick={()=>Navigate('/dashboard')}>الذهاب الى الصفحة الرئيسية </Button>
      <h2>جميع المجالات</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Row>
        {fields.map(field => (
          <Col key={field._id} md={4}>
            <Card className="mb-3 p-3">
              <Card.Body>
                <Card.Title>{field.name}</Card.Title>
                <Button 
                  variant="primary" 
                  className="me-2" 
                  onClick={() => handleShowModal(field)} 
                >
                  تعديل
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(field._id)} 
                >
                  حذف
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for adding or editing a field */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalField ? 'تعديل المجال' : 'إضافة مجال'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fieldName">
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
              {modalField ? 'تحديث المجال' : 'إضافة المجال'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AllFields;
