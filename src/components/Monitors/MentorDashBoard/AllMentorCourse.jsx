import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllMentorCourse = () => {
  const [courses, setCourses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCourseData, setUpdateCourseData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/mentor/66e57c979c273fa019b4dca5`, { withCredentials: true });
        setCourses(response.data.data); // Update to match API response structure
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleOpenUpdateModal = (course) => {
    setUpdateCourseData(course);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdateCourseData({});
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateCourseData({ ...updateCourseData, [name]: value });
  };

  const handleUpdateCourse = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}courses/${updateCourseData._id}`, updateCourseData, { withCredentials: true });
      alert('Course updated successfully!');
      setCourses(courses.map(course => (course._id === updateCourseData._id ? updateCourseData : course)));
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="all-mentor-course-container">
      <h2>Your Courses</h2>
      <div className="course-grid-container">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course._id} className="course-card">
              <Card.Img variant="top" src={`${import.meta.env.VITE_MAIN_URL}images/${course.image}`} alt={course.title} />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Price: ${course.price}</Card.Subtitle>
                <Card.Text><strong>Field:</strong> {course.field}</Card.Text>
                <Card.Text><strong>Course Link:</strong> <a href={course.courseLink} target="_blank" rel="noopener noreferrer">Watch Course</a></Card.Text>
                <Button variant="info" onClick={() => navigate(`/course/${course._id}`)}>إضافة فيديو</Button>
                <Button variant="primary" onClick={() => handleOpenUpdateModal(course)}>تعديل</Button>
                <Button variant="danger" onClick={() => handleDeleteCourse(course._id)}>حذف </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>

      {/* Update Course Modal */}
      {showUpdateModal && (
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCourseTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={updateCourseData.title || ''}
                  onChange={handleUpdateChange}
                  placeholder="Enter course title"
                />
              </Form.Group>
              <Form.Group controlId="formCourseDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={updateCourseData.description || ''}
                  onChange={handleUpdateChange}
                  placeholder="Enter course description"
                />
              </Form.Group>
              <Form.Group controlId="formCoursePrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={updateCourseData.price || ''}
                  onChange={handleUpdateChange}
                  placeholder="Enter course price"
                />
              </Form.Group>
              <Form.Group controlId="formCourseField">
                <Form.Label>Field</Form.Label>
                <Form.Control
                  type="text"
                  name="field"
                  value={updateCourseData.field || ''}
                  onChange={handleUpdateChange}
                  placeholder="Enter course field"
                />
              </Form.Group>
              <Form.Group controlId="formCourseLink">
                <Form.Label>Course Link</Form.Label>
                <Form.Control
                  type="text"
                  name="courseLink"
                  value={updateCourseData.courseLink || ''}
                  onChange={handleUpdateChange}
                  placeholder="Enter course link"
                />
              </Form.Group>
              <Form.Group controlId="formCourseImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={updateCourseData.image || ''}
                  onChange={handleUpdateChange}
                  placeholder="Enter image URL"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
            <Button variant="primary" onClick={handleUpdateCourse}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AllMentorCourse;
