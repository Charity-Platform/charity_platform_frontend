import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Core styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Default layout styles
import axios from 'axios';
import './Books.css';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books/review/${bookId}`, {
          withCredentials: true,
        });

        console.log('API Response:', response.data); // Log the entire response to inspect it
        setBook(response.data);

        // If you want to fetch the owner's name based on the response, use the owner ID if available
        // Assuming there's no owner in the response, so skipping the mentor fetch for now
        // const mentorResponse = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/${response.data.owner}`);
        // setOwnerName(mentorResponse.data.name);
      } catch (error) {
        if (error.response) {
          console.error('Error data:', error.response.data);
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
          {/* <h4 className="book-detail-author">by {ownerName || 'Loading...'}</h4> */}
          <p className="book-detail-price">{book.price} د.ك</p>
          <p className="book-detail-description">{book.description}</p>
          <Button className="btn-download" onClick={() => navigate(`/bookpyment/${bookId}`)}>
            شراء الكتاب
          </Button>
        </Col>
      </Row>

      <div className="pdf-viewer mt-5">
        <h2 className="text-center">مراجعة الكتاب</h2>
        {book.review ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
            <Viewer fileUrl={book.review} />
          </Worker>
        ) : (
          <p className="text-center">PDF not available for this book.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
