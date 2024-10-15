// src/components/BookList.js
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'; // Import Bootstrap components
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate

const BookList = ({ books }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShowBooks = (bookId) => {
    navigate(`/book_details/${bookId}`); // Navigate with the bookId
  };

  return (
    <Row xs={1} md={2} lg={4} className="g-4 mb-5 text-center">
      {books.map((book) => (
        <Col key={book._id}> {/* Use book._id for unique key */}
          <Card className="h-1 shadow-sm card-books">
            <Card.Img variant="top" src={book.image} alt={book.title} className="book-img" />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>وصف: {book.description}</Card.Text>
              <Card.Text>السعر: {book.price} د.ك</Card.Text>
              <Card.Text>
                <button className='btn-book' onClick={() => handleShowBooks(book._id)}>طلب الكتاب</button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
