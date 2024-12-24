// src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css'; // Custom CSS file
import BookList from './BookList';
import axios from 'axios';

const BookApp = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books`, {
          withCredentials: true,
        });

        // Verify the structure of the response and set books
        if (response.data && Array.isArray(response.data.document)) {
          setBooks(response.data.document);
        } else {
          throw new Error('Unexpected API response structure');
        }
      } catch (error) {
        setError(error.message || 'An error occurred while fetching books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-center-book">مكتبة الكتب</h1>

      {/* Show loading spinner */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">جار التحميل...</span>
          </div>
        </div>
      ) : error ? (
        // Display error message
        <div className="alert alert-danger text-center" role="alert">
          حدث خطأ أثناء تحميل البيانات: {error}
        </div>
      ) : books.length === 0 ? (
        // Handle empty books list
        <div className="alert alert-info text-center" role="alert">
          لا توجد كتب متوفرة في الوقت الحالي.
        </div>
      ) : (
        // Render BookList with the fetched books
        <BookList books={books} />
      )}
    </div>
  );
};

export default BookApp;
