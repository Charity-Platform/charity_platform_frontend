import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCourses = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [reviewFile, setReviewFile] = useState(null);  // New state for review PDF
    const [fields, setFields] = useState([]); // Initialize as an empty array
    const [selectedField, setSelectedField] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch available fields from the API
    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`);
                console.log('Fields API response:', response.data); // Log the response
                
                // Adjust based on your actual API response structure
                const fetchedFields = response.data.document || []; // Adjust according to your API
                setFields(fetchedFields); // Set fields as an array or empty array
            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        };

        fetchFields();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', Number(price));
        formData.append('image', imageFile); // Append the image file
        formData.append('pdf', pdfFile); // Append the PDF file
        formData.append('fields', selectedField); // Append the selected field
        formData.append('review', reviewFile);  // Append the review PDF file

        try {
            const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}books`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            console.log('New book created:', response.data);

            // Show success alert
            toast.success('تم إنشاء الكتاب بنجاح!');

            // Reset fields
            setTitle('');
            setDescription('');
            setPrice('');
            setImageFile(null);
            setPdfFile(null);
            setReviewFile(null); // Reset review file
            setSelectedField('');
        } catch (error) {
            console.error('Error creating new book:', error);
            // Show error alert
            toast.error('حدث خطأ أثناء إنشاء الكتاب، يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false); // Set loading to false after the request
        }
    };

    return (
      <Container>
        <h1 className="my-4">إنشاء كتاب جديد</h1>
        <Form onSubmit={handleSubmit} dir="rtl">
          <Form.Group controlId="formTitle">
            <Form.Label>العنوان</Form.Label>
            <Form.Control
              type="text"
              placeholder="أدخل عنوان الكتاب"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>الوصف</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="أدخل وصف الكتاب"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                resize: "vertical",
              }}
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>السعر</Form.Label>
            <Form.Control
              type="number"
              placeholder="أدخل السعر"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>الصورة</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="formPdf">
            <Form.Label>ملف PDF</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="formReview">
            <Form.Label>مراجعة الكتاب (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setReviewFile(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="formFields">
            <Form.Label>المجال</Form.Label>
            <Form.Control
              as="select"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              required
            >
              <option value="">اختر المجال</option>
              {fields.length > 0 ? (
                fields.map((field) => (
                  <option key={field._id} value={field._id}>
                    {field.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  لا توجد مجالات متاحة
                </option>
              )}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> جاري الإنشاء...
              </>
            ) : (
              "إنشاء الكتاب"
            )}
          </Button>
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
        />
      </Container>
    );
};

export default NewCourses;
