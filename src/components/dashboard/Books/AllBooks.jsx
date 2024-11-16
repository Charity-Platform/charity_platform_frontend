import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './books.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setBooks(response.data.document);
      } catch (err) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle delete
  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}books/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      // Remove the deleted book from the state
      setBooks(books.filter(book => book._id !== bookId));
    } catch (err) {
      setError('Failed to delete the book.');
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      <h2 className="books-title">All Books</h2>
      <div className='buttonHeader'>
           <Link to="/" className='displaywebsite'>
            <Button variant="primary">عرض الموقع</Button>
          </Link>
          <Link to="/addbook">
            <Button variant="primary"> إضافة كتاب </Button>
          </Link>
         
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.image || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="book-image"
              />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">By {book.owner ? book.owner.name : 'Unknown'}</p>
              <p className="book-description">{book.description}</p>
              <p className="book-price">${book.price}</p>
              <div className="book-actions">
                <button
                  className="btn btn-danger deleted-button-book"
                  onClick={() => handleDelete(book._id)}>حذف الكتاب</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
