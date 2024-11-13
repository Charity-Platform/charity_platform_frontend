import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Form, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../Mentor.css'; // Import the custom CSS file for styling

const AllMentorCourse = () => {
  const { mentorId } = useParams(); // Get mentorId from URL
  const [courses, setCourses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCourseData, setUpdateCourseData] = useState({});
  const [error, setError] = useState(null); // State to track error
  const [loading, setLoading] = useState(false); // Track loading state for fetching data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!mentorId) {
        setError('Mentor ID is not provided.');
        return; // Exit early if mentorId is undefined
      }
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/mentor/${mentorId}`, { withCredentials: true });
        setCourses(response.data.data); // Update to match API response structure
        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error('Error fetching courses:', error.response ? error.response.data : error.message);
        setError('Failed to load courses. Please try again.');
        setLoading(false); // Set loading state to false
      }
    };

    fetchCourses();
  }, [mentorId]); // Depend on mentorId

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
      toast.success('Course updated successfully!');
      setCourses(courses.map(course => (course._id === updateCourseData._id ? updateCourseData : course)));
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
      setCourses(courses.filter(course => course._id !== courseId));
      toast.success('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course. Please try again.');
    }
  };

  const handleShowDetails = (courseId) => {
    // Navigate to the CoursesDetails page with courseId
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="all-mentor-course-container">
      <h2>Your Courses</h2>
      <div className="course-grid-container">
        {error ? (
          <p>{error}</p> // Display error message if an error occurred
        ) : loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course._id} className="course-card">
              <Card.Img variant="top" src={course.image} alt={course.title} className="course-image" />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Price: ${course.price}</Card.Subtitle>
                <Card.Text><strong>Field:</strong> {course.field}</Card.Text>
                <Card.Text><strong>Course Link:</strong> <a href={course.courseLink} target="_blank" rel="noopener noreferrer">Watch Course</a></Card.Text>
                <Button variant="info" onClick={() => handleShowDetails(course._id)}>Add Videos</Button>
                <Button variant="primary" onClick={() => handleOpenUpdateModal(course)}>تعديل</Button>
                <Button variant="danger" onClick={() => handleDeleteCourse(course._id)}>حذف</Button>
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
                  type="text"
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
            <Button variant="primary" onClick={handleUpdateCourse}>Update Course</Button>
          </Modal.Footer>
        </Modal>
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
    </div>
  );
};

export default AllMentorCourse;
