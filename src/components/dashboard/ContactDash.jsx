import React from 'react'
import RightSide from './RightSide'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './DashBoard.css';
import { Link } from 'react-router-dom';
const ContactDash = () => {


   // Static data for demonstration
   const [contacts, setContacts] = useState([
    { id: 1, name: 'Ahmed Ali', message: 'Hello, I need assistance with my account.' },
    { id: 2, name: 'Sara Mohamed', message: 'Can you help with my recent order?' },
    { id: 3, name: 'ali helal', message: 'I have a question about your services.' },
    { id: 4, name: 'zahra Ali', message: 'Hello, I need assistance with my account.' },
    { id: 5, name: 'amal Mohamed', message: 'Can you help with my recent order?' },
    { id:6, name: 'ahmed anwer', message: 'I have a question about your services.' }
  ]);

  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetailsModal(true);
  };

  const handleDeleteContact = (contactId) => {
    // Delete contact by ID
    setContacts(contacts.filter(contact => contact.id !== contactId));
    setShowDetailsModal(false); // Close the details modal after deletion
  };

  const handleDeleteAll = () => {
    // Delete all contacts
    setContacts([]);
    setShowDeleteAllModal(false); // Close the delete all modal
  };

  const handleShowDeleteAllModal = () => setShowDeleteAllModal(true);
  const handleCloseDeleteAllModal = () => setShowDeleteAllModal(false);
  const handleCloseDetailsModal = () => setShowDetailsModal(false);


  return (
     <Container className="py-4">
      <Row>
        <Col md={8}>
          <h1>تواصل معنا</h1>
        </Col>
        <Col md={2}>
          <Button variant="danger" onClick={handleShowDeleteAllModal}>
            حذف كل الرسائل
          </Button>
        </Col>
        <Col md={2}>
          <Button variant="primary">
            <Link to="/dashBoard" style={{color:'#fff'}}>
             رجوع للرئيسية
            </Link>
         
          </Button>
        </Col>
      </Row>
      <Row>
        {contacts.map((contact) => (
          <Col md={4} key={contact.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{contact.name}</Card.Title>
                <Card.Text>
                  {contact.message}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(contact)}>
                  عرض التفاصيل
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

         {/* Delete Confirmation Modal */}
         <Modal show={showDeleteAllModal} onHide={handleCloseDeleteAllModal}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          هل أنت متأكد أنك تريد حذف جميع الرسائل؟
        </Modal.Body>
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
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الرسالة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <>
              <p><strong>الاسم:</strong> {selectedContact.name}</p>
              <p><strong>رسالة:</strong> {selectedContact.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteContact(selectedContact.id)}>
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


export default ContactDash
