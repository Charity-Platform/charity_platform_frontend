import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './Book.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to handle image upload

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}books`);
        const bookData = Array.isArray(response.data.document) ? response.data.document : response.data.books;
        setBooks(bookData || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setImageFile(null); // Reset image file on update
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
    setImageFile(null); // Reset image file on modal close
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}books/${id}`, { withCredentials: true });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const { title, description, price } = selectedBook;
    const priceValue = Number(price); // Convert price to a number

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', priceValue);
    if (imageFile) {
        formData.append('image', imageFile); // Append image file if available
    }

    try {
        const response = await axios.put(
            `${import.meta.env.VITE_MAIN_URL}books/${selectedBook._id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct content type
                },
                withCredentials: true,
            }
        );

        console.log('Update response:', response.data); // Log the entire response
        alert(' تم تحديث الدورة بنجاح '); 
        // Check if the API returns the updated book information
        const updatedBook = response.data; // Ensure your API returns the updated book object

        // Update the book list with new values
        const updatedBooks = books.map((book) => {
            if (book._id === updatedBook._id) {
                return { ...book, ...updatedBook }; // Merge existing book with the updated data
            }
            return book;
        });

        setBooks(updatedBooks); // Set the updated book list to state
        handleCloseModal();
    } catch (error) {
        console.error('Error updating book:', error);
    }
};

  

  return (
    <Container>
      <h1 className="my-4">All Books</h1>
      <Row>
        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book._id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Text>Price: ${book.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleUpdate(book)}>Update</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </Row>

      {showModal && selectedBook && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitUpdate}>
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={selectedBook.title}
                onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                required
              />
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                value={selectedBook.description}
                onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={selectedBook.price}
                onChange={(e) => setSelectedBook({ ...selectedBook, price: e.target.value })}
                required
              />
              <label>Image:</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImageFile(e.target.files[0])} // Get the selected file
              />
              <Button variant="success" type="submit" className="mt-3">Save Changes</Button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default AllBooks;
