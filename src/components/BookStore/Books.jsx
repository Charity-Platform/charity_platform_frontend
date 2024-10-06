// src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css'; // Custom CSS file
import BookList from './BookList';
import axios from 'axios';

const BookApp = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books`, {
          withCredentials: true,
        });
        setBooks(response.data.document); // Assuming the response contains the document array
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-center-book">مكتبة الكتب</h1>
      <BookList books={books} />
    </div>
  );
};

export default BookApp;
