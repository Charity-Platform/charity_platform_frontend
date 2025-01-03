import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate } from 'react-router-dom'; // Use useNavigate

const BookList = ({ books }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShowBooks = (bookId) => {
    navigate(`/book_details/${bookId}`); // Navigate with the bookId
  };

  return (
    <Row xs={1} md={2} lg={4} className="g-4 mb-5 text-center">
      {books.map((book) => (
        <Col key={book._id}> {/* Use book._id for unique key */}
          <Card className="h-100 shadow-lg rounded border-0 card-books">
            <Card.Img 
              variant="top" 
              src={book.image || 'https://via.placeholder.com/150'} 
              alt={book.title} 
              className="book-img rounded-top" 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-truncate" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {book.title}
              </Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: '0.9rem', minHeight: '60px' }}>
                {/* وصف: {book.description} */}
              </Card.Text>
              <Card.Text className="price-text">
                {book.price === 0 ? (
                  <span className="badge bg-success px-4 py-2 mb-4">مجاني</span>
                ) : (
                  `${book.price} د.ك`
                )}
              </Card.Text>
              {/* Adjust Button */}
              <div className="mt-auto">
                <button 
                  className="btn btn-primary w-100" 
                  style={{ minHeight: '40px' }} // Ensure consistent height
                  onClick={() => handleShowBooks(book._id)}>
                  تفاصيل الكتاب
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
