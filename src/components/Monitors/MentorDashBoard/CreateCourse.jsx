import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../LoginAndRegister/Loading'

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        price: '',
        description: '',
        field: '',
        courseLink: '',
        image: null,
      });
    
      // State for handling form submission status
      const [successMessage, setSuccessMessage] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
      // Handle input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
      };
    
      // Handle file change for image upload
      const handleFileChange = (e) => {
        setCourseData({ ...courseData, image: e.target.files[0] });
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object to handle file upload
        const formData = new FormData();
        formData.append('title', courseData.title);
        formData.append('price', courseData.price);
        formData.append('description', courseData.description);
        formData.append('field', courseData.field);
        formData.append('courseLink', courseData.courseLink);
        if (courseData.image) {
          formData.append('image', courseData.image);
        }
        setIsLoading(true);
        try {
          // Sending the POST request to the /courses endpoint
          const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}courses`, formData, {
           
                withCredentials: true,
            
          });
    
          // Handle successful form submission
          
          setSuccessMessage('Course created successfully!');
          // navigate("/");
          setIsLoading(false);
          setErrorMessage('');
          setCourseData({
            title: '',
            price: '',
            description: '',
            field: '',
            courseLink: '',
            image: null,
          });
        } catch (error) {
          // Handle errors during form submission
          console.error('Error creating course:', error.response ? error.response.data : error.message);
          setErrorMessage('Failed to create course. Please try again.');
          setSuccessMessage('');
        }
      };
    
      return (
        <Container className="mt-5" dir="rtl">
             <Button variant="primary" onClick={() => navigate('/adminMentor')} className="mb-5">
            الصفحة الرئيسية
          </Button>
    
          <h2>إنشاء دورة جديدة</h2>
    
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    
          <Form onSubmit={handleSubmit}>
            {/* Course Title */}
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>عنوان الدورة</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل عنوان الدورة"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            {/* Course Price */}
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل سعر الدورة"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            {/* Course Description */}
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>الوصف</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="أدخل وصف الدورة"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            {/* Course Field */}
            <Form.Group className="mb-3" controlId="formField">
              <Form.Label>المجال</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل مجال الدورة"
                name="field"
                value={courseData.field}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            {/* Course Link */}
            <Form.Group className="mb-3" controlId="formCourseLink">
              <Form.Label>رابط الدورة</Form.Label>
              <Form.Control
                type="url"
                placeholder="أدخل رابط الدورة"
                name="courseLink"
                value={courseData.courseLink}
                onChange={handleChange}
                required
              />
            </Form.Group>
    
            {/* Course Image */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>صورة الدورة</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>
    
            {/* Submit Button */}
            <Button variant="primary" type="submit">
              إنشاء الدورة
            </Button>
          </Form>
        </Container>
      );
}

export default CreateCourse
