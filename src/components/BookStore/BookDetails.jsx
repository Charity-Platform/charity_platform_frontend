import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import './Books.css';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_MAIN_URL}books/${bookId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
  
        const data = await response.json();
       console.log('Fetched book data:', data); // Log the data here
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookDetails();
  }, [bookId, token]);
  
  // Download book function
  const handleDownloadBook = () => {
    if (book && book.pdf) {
      window.open(book.pdf, '_blank');
    } else {
      alert('Download URL not available. Please check back later.');
    }
  };

  // Handle navigation to main book page
  const handleBackToMainPage = () => {
    navigate('/books'); // Navigate to the main book page
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="book-details-container my-5">
      {/* Back to Main Page Button */}
      <div className="text-center mb-3">
        <Button className="btn-back" onClick={handleBackToMainPage}>
          العودة إلى الصفحة الرئيسية للكتب
        </Button>
      </div>

      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <img src={book.image} alt={book.title} className="book-detail-image" />
        </Col>
        <Col md={6}>
          <h1 className="book-detail-title">{book.title}</h1>
          <h4 className="book-detail-author">by {book.author}</h4>
          <p className="book-detail-price">{book.price} ر.س</p>
          <p className="book-detail-description">{book.description}</p>
          <Button className="btn-download" onClick={handleDownloadBook}>
            تحميل الكتاب
          </Button>
          <div className="book-rating mt-3">
            <span>Rating: {book.rating} ★</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookDetails;
