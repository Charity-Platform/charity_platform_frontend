// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css'; // Custom CSS file
import booksData from './bookData'; // Import booksData
import BookList from './BookList';
import FilterBooks from './FilterBooks';

const BookApp = () => {
  const [books, setBooks] = useState(booksData);
  const categories = ['مجانى', 'إشتراك']; // Sample categories

  const handleCategorySelect = (selectedCategory) => {
    if (selectedCategory === '') {
      setBooks(booksData); // Reset to all books
    } else {
      const filteredBooks = booksData.filter(book => book.category === selectedCategory);
      setBooks(filteredBooks);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-center">مكتبة الكتب  </h1>
      <FilterBooks categories={categories} onSelectCategory={handleCategorySelect} />
      <BookList books={books} />
    </div>
  );
};

export default BookApp;
