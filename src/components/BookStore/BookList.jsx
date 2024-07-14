import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'; // Import Bootstrap components

const BookList = ({ books }) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4 mb-5 text-center">
      {books.map((book) => (
        <Col key={book.id}>
          <Card className="h-1 shadow-sm card-books">
            <Card.Img variant="top" src={book.imageUrl} alt={book.title} className="book-img" />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>المؤلف : {book.author}</Card.Text>
              <Card.Text>
                <small className="text-muted">{book.category}</small>
              </Card.Text>
              <Card.Text>
                <button className='btn-book'>طلب الكتاب  </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
