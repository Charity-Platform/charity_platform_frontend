import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import './Book.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);  // To hold the PDF file
  const [reviewFile, setReviewFile] = useState(null);  // To hold the review file

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
    setImageFile(null);
    setPdfFile(null);
    setReviewFile(null);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
    setImageFile(null);
    setPdfFile(null);
    setReviewFile(null);
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
    const { title, description, price, isFree } = selectedBook;

    // Ensure `isFree` is a boolean
    const isFreeValue = isFree === 'true' ? true : false;
    const priceValue = isFreeValue ? 0 : Number(price); // If it's free, set price to 0

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', priceValue);
    formData.append('isFree', isFreeValue);  // Ensure isFree is a boolean
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (pdfFile) {
      formData.append('pdf', pdfFile);  // Add the selected PDF file
    }
    if (reviewFile) {
      formData.append('review', reviewFile);  // Add the selected review file
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MAIN_URL}books/${selectedBook._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      const updatedBook = response.data.document;
      const updatedBooks = books.map((book) => (book._id === updatedBook._id ? { ...book, ...updatedBook } : book));
      setBooks(updatedBooks);
      alert("تم التحديث");
      handleCloseModal();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">جميع الكتب الخاصة بكم</h1>
      <Row>
        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book._id} xs={12} md={6} lg={3} className="mb-4">
              <Card className="shadow-sm book-card">
                <Card.Img
                  variant="top"
                  src={book.image || 'https://via.placeholder.com/150'}
                  alt={book.title}
                  className="book-image"
                />
                <Card.Body>
                  <Card.Title className="text-truncate">{book.title}</Card.Title>
                  <Card.Text className="text-truncate">{book.description}</Card.Text>
                  <Card.Text>Price: {book.isFree ? 'Free' : `$${book.price}`}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => handleUpdate(book)} className="m-2">
                      تحديث
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(book._id)} className="m-2" style={{backgroundColor:'red'}}>
                      حذف
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">حدث مشكله في الاتصال بالإنترنت حاول مره اخرى</p>
        )}
      </Row>

      {showModal && selectedBook && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>تحديث الكتاب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>العنوان:</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedBook.title}
                  onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>تفاصيل:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedBook.description}
                  onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>سعر الكتاب:</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedBook.isFree ? 0 : selectedBook.price}
                  onChange={(e) => setSelectedBook({ ...selectedBook, price: e.target.value })}
                  required
                  disabled={selectedBook.isFree}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="هل الكتاب مجاني؟"
                  checked={selectedBook.isFree}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedBook({ ...selectedBook, isFree: isChecked, price: isChecked ? 0 : selectedBook.price });
                  }}
                  style={{ transform: 'scale(0.8)' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>صورة غلاف :</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>PDF للكتاب :</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>مراجعة الكتاب :</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setReviewFile(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mt-3">
                حفظ كل التغييرات
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default AllBooks;
