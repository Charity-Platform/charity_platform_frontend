import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses`, {
          withCredentials: true,
        });
        setCourses(response.data.document || []);
      } catch (error) {
        console.error('Error fetching courses:', error.response ? error.response.data : error.message);
        setErrorMessage('Failed to fetch courses.');
      }
      
    };

    fetchCourses();
  }, []);

  // Delete a course by its ID
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, {
        withCredentials: true,
      });
      setCourses(courses.filter((course) => course._id !== courseId));
      setSuccessMessage('Course deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting course:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to delete course.');
      setSuccessMessage('');
    }
  };

  // Open the modal and set the selected course data
  const handleUpdateCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  // Handle form submission to update course
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}courses/${selectedCourse._id}`, selectedCourse, {
        withCredentials: true,
      });
      // Update the course list after a successful update
      setCourses(courses.map((course) => (course._id === selectedCourse._id ? selectedCourse : course)));
      setSuccessMessage('Course updated successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error updating course:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to update course.');
    }
  };

  // Handle input changes in the modal form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse({ ...selectedCourse, [name]: value });
  };

  return (
    <Container className="mt-5" dir="rtl">
      <h2>كل الدورات</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Table to display courses */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>عنوان الدورة</th>
            <th>السعر</th>
            <th>الوصف</th>
            <th>المجال</th>
            <th>الرابط</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.price}</td>
                <td>{course.description}</td>
                <td>{course.field}</td>
                <td>
                  <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
                    رابط الدورة
                  </a>
                </td>
                <td>
                  <Button variant="danger" className="me-4 m-1" onClick={() => handleDeleteCourse(course._id)}>
                    حذف
                  </Button>
                  <Button variant="warning" onClick={() => handleUpdateCourse(course)}>
                    تعديل
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">لا توجد دورات متاحة.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for updating course */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>تحديث الدورة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>عنوان الدورة</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedCourse.title || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPrice" className="mb-3">
                <Form.Label>السعر</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={selectedCourse.price || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>الوصف</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={selectedCourse.description || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formField" className="mb-3">
                <Form.Label>المجال</Form.Label>
                <Form.Control
                  type="text"
                  name="field"
                  value={selectedCourse.field || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCourseLink" className="mb-3">
                <Form.Label>رابط الدورة</Form.Label>
                <Form.Control
                  type="url"
                  name="courseLink"
                  value={selectedCourse.courseLink || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                تحديث
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AllCourses;
