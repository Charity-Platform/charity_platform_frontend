import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './Books.css';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState(''); // State for owner's name

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books/${bookId}`, {
          withCredentials: true,
        });

        console.log('API Response:', response.data); // Log the entire response to inspect it
        setBook(response.data);

              // Fetch the owner's name using the owner's ID from the book details
              const mentorResponse = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${response.data.owner}`);
              setOwnerName(mentorResponse.data.name); // Set the owner's name from the mentor response
             
      
      } catch (error) {
        if (error.response) {
          console.error('Error data:', error.response.data); // Log error details
          console.error('Error status:', error.response.status);
        } else {
          console.error('Error fetching book details:', error.message);
        }

        if (error.response && error.response.status === 401 && error.response.data.message === 'This user is not subscribed') {
          alert('You need to subscribe to access this book.');
          navigate('/subscribe');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleDownloadBook = () => {
    if (book && book.pdf) {
      window.open(book.pdf, '_blank');
    } else {
      alert('Download URL not available. Please check back later.');
    }
  };

  const handleBackToMainPage = () => {
    navigate('/books');
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
      <div className="text-center mb-3">
        <Button className="btn-back" onClick={handleBackToMainPage}>
          العودة إلى الصفحة الرئيسية للكتب
        </Button>
      </div>

      <Row className="align-items-center">
        <Col md={6} className="text-center">
          {book.image ? (
            <img src={book.image} alt={book.title} className="book-detail-image" />
          ) : (
            <p>Image not available</p>
          )}
        </Col>
        <Col md={6}>
          <h1 className="book-detail-title">{book.title}</h1>
          <h4 className="book-detail-author">by {ownerName || 'Loading...'}</h4> {/* Display owner's name */}
          <p className="book-detail-price">{book.price} د.ك</p>
          <p className="book-detail-description">{book.description}</p>
          <Button className="btn-download" onClick={handleDownloadBook}>
            تحميل الكتاب
          </Button>
          <div className="book-rating mt-3">
            <span>التقييم : {book.rating} ★★★</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookDetails;
