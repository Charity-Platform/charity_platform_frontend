import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Core styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Default layout styles
import axios from 'axios';
import './Books.css';

const BookView = () => {
  const { id: bookId } = useParams(); // Extract book ID from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books/${bookId}`, {
          withCredentials: true,
        });
        setBook(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          if (error.response.status === 404) {
            setError('Book not found.');
          } else {
            setError('An error occurred while fetching the book.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
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

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="warning">لا يوجد كتاب حاليا</Alert>
      </Container>
    );
  }

  return (
    <div className="book-details-container my-5">
      <div className="text-center mb-3">
        <Button className="btn-back" onClick={handleBackToMainPage}>
          العودة إلى الصفحة الرئيسية للكتب
        </Button>
      </div>

      <div className="pdf-viewer mt-5">
        <h2 className="text-center">عرض الكتاب</h2>
        {book.review ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
            <Viewer fileUrl={book.pdf} />
          </Worker>
        ) : (
          <p className="text-center">PDF not available for this book.</p>
        )}
      </div>
    </div>
  );
};

export default BookView;
