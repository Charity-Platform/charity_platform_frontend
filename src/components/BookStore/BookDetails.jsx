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
  
  // Assume userId is fetched from context or local storage
  const userId = localStorage.getItem('userId'); // Replace with actual way of fetching user ID

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch book details from the API
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books/review/${bookId}`, {
          withCredentials: true,
        });
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        if (error.response && error.response.status === 404) {
          alert('Book not found.');
          navigate('/books');
        } else {
          alert('An error occurred while fetching the book details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId, navigate]);

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

  // Check if the user is in the paidUsers list
  const isPaidUser = book.paidUsers && book.paidUsers.includes(userId);

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
          <p className="book-detail-price">{book.price} د.ك</p>
          <p className="book-detail-description">{book.description}</p>

          {/* Render button conditionally based on whether the user has paid */}
          {isPaidUser ? (
            <Button
              className="btn-download"
              onClick={() => navigate(`/BookView/${bookId}`)}
            >
              عرض الكتاب
            </Button>
          ) : (
            <Button
              className="btn-download"
              onClick={() => navigate(`/bookpyment/${bookId}`)}
            >
              شراء الكتاب
            </Button>
          )}
        </Col>
      </Row>

      <div className="pdf-viewer mt-5">
        <h2 className="text-center">مراجعة الكتاب</h2>
        {book.review ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
            <Viewer fileUrl={book.review} />
          </Worker>
        ) : (
          <p className="text-center">للاسف لا توجد نسخة لمراجعة فى هذا الكتاب </p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
