import { Container, Row, Col, Card, Button, Modal, Spinner } from 'react-bootstrap'; // Import Spinner component
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactDash = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}contact-us`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Response data:', response.data); // Log response data to check structure

        // Assuming response.data is already an array of contact objects
        if (Array.isArray(response.data.document)) {
          setContacts(response.data.document); // Directly use the response data
        } else {
          console.error('Unexpected response format:', response.data.document);
          setErrorMessage('Unexpected data format from server.');
        }

        setErrorMessage('');
      } catch (error) {
        console.error('Error response:', error.response); // Debugging line
        if (error.response && error.response.status === 401) {
          setErrorMessage('Unauthorized access. Please check your credentials.');
        } else {
          setErrorMessage('There was an error fetching the contacts!');
        }
      } finally {
        setLoading(false); // Stop loading after data fetch is complete
      }
    };

    fetchContacts();
  }, []);

  //handel function to get details of card 
  const handleViewDetails = async (contact) => {
    setLoading(true); // Start loading state for fetching details
    setShowDetailsModal(true); // Show modal first

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}contact-us/${contact._id}`, // Fetch specific contact by ID
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Contact details:', response.data); // Log the fetched details
      setSelectedContact(response.data); // Update selectedContact with fetched data
    } catch (error) {
      console.error('Error fetching contact details:', error);
      setErrorMessage('Failed to fetch contact details.');
    } finally {
      setLoading(false); // Stop loading after fetching details
    }
  };


  const handleDeleteContact = async (contactId) => {
    try {
      // Call the API to delete the contact by ID
      await axios.delete(
        `${import.meta.env.VITE_MAIN_URL}contact-us/${contactId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      // If the delete request is successful, update the state to remove the contact from the list
      setContacts(contacts.filter((contact) => contact._id !== contactId));
      setShowDetailsModal(false); // Close the modal after deleting
    } catch (error) {
      console.error('Error deleting contact:', error);
      setErrorMessage('Failed to delete the contact. Please try again.'); // Set error message
    }
  };
  

  const handleDeleteAll = async () => {
    try {
      setLoading(true); // Start loading
      await axios.delete(
        `${import.meta.env.VITE_MAIN_URL}contact-us`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setContacts([]);
      setShowDeleteAllModal(false);
      alert('All contacts deleted successfully!'); // Show success toast
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      toast.error('Failed to delete all contacts. Please try again.'); // Show error toast
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleShowDeleteAllModal = () => setShowDeleteAllModal(true);
  const handleCloseDeleteAllModal = () => setShowDeleteAllModal(false);
  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <h1>تواصل معنا</h1>
        </Col>
        <Col md={2}>
          <Button variant="primary">
          <Link to="/">
            <Button variant="primary">عرض الموقع</Button>
          </Link>
          </Button>
        </Col>
        <Col md={2}>
          <Button variant="danger" onClick={handleShowDeleteAllModal}>
            حذف كل الرسائل
          </Button>
        </Col>
        <Col md={2}>
          <Button variant="primary">
            <Link to="/dashBoard" style={{ color: '#fff' }}>
              رجوع للرئيسية
            </Link>
          
          </Button>
        </Col>
      
      </Row>

      <Row>
        {loading ? ( // Show spinner while loading
          <Col className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : (
          <>
            {errorMessage && (
              <Col>
                <p className="text-danger">{errorMessage}</p>
              </Col>
            )}
            {Array.isArray(contacts) && contacts.length > 0 ? (
              contacts.map((contact, index) => ( // Use index if _id is not reliable
                <Col md={4} key={index} className="mb-4">
                  <Card dir='rtl'>
                    <Card.Body>
                      <Card.Title>{contact.name}</Card.Title>
                      <Card.Text>
                        <strong>البريد الالكترونى:   </strong> {contact.email}<br />
                        <strong>الاسم :  </strong> {contact.name}
                      </Card.Text>
                      <Button variant="primary" onClick={() => handleViewDetails(contact)}>
                        عرض التفاصيل
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>No contacts found.</p>
              </Col>
            )}
          </>
        )}
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteAllModal} onHide={handleCloseDeleteAllModal}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد أنك تريد حذف جميع الرسائل؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteAllModal}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDeleteAll}>
            حذف جميع الرسائل
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Contact Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} dir="rtl">
        <Modal.Header>
          <Button variant="close" onClick={handleCloseDetailsModal} style={{ marginLeft: 'auto' }}>
            &times;
          </Button>
          <Modal.Title>تفاصيل الرسالة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <>
              <p><strong>الاسم: </strong> {selectedContact.name}</p>
              <p><strong>البريد الإلكتروني: </strong> {selectedContact.email}</p>
              <p><strong>رقم الهاتف: </strong> {selectedContact.phone}</p>
              <p><strong>العنوان: </strong> {selectedContact.address}</p>
              <p><strong>الرسالة: </strong> {selectedContact.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteContact(selectedContact._id)}>
            حذف هذه الرسالة
          </Button>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContactDash;
