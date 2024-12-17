import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import './Cources.css';

const CoursesDetails = () => {
  const { id } = useParams(); // Course ID from the route params
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId'); // Get the userId from localStorage

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses`, {
          withCredentials: true,
        });
        const allCourses = response.data.document;
        const singleCourse = allCourses.find((c) => c._id === id); // Find course with the specified ID

        if (!singleCourse) {
          throw new Error('Course not found');
        }
        setCourse(singleCourse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Check if the current user has paid for the course
  const isPaidUser = course?.paidUsers?.includes(userId);

  const handleSubscribe = () => {
    navigate(`/CoursesPyment/${id}`); // Navigate to the payment page
  };

  const handleWatchVideos = () => {
    navigate(`/CourseVideos/${id}`);
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <p className="text-danger text-center">Error: {error}</p>;
  }

  // Handle case where no course was found
  if (!course) {
    return <p className="text-center">No course found.</p>;
  }

  return (
    <div className="course-details-container my-5">
      <div className="text-center mb-3">
        <Button className="btn-back" onClick={() => navigate('/Cources')}>
          العودة إلى الصفحة الرئيسية للكورسات
        </Button>
      </div>

      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <img src={course.image} alt={course.title} className="course-detail-image" />
        </Col>
        <Col md={6}>
          <h1 className="course-detail-title">{course.title}</h1>
          <p className="course-detail-price">
            <strong>سعر الكورس :</strong> {course.price} دينار
          </p>
          <p className="course-detail-description">
            <strong>الوصف :</strong> {course.description}
          </p>
          <p className="course-detail-field">
            <strong>المجال :</strong> {course.field}
          </p>

          {isPaidUser ? (
            <Button className="btn-success mt-3 w-100" onClick={handleWatchVideos}>
              عرض جميع الفيديوهات
            </Button>
          ) : (
            <Button className="btn-primary mt-3 w-100" onClick={handleSubscribe}>
              اشترك في هذا الكورس
            </Button>
          )}
          <div className="course-rating mt-3">
            <span>التقييم: {course.rating || ' ★★★★★'} </span>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          {course.courseLink ? (
            <Card className="shadow-lg">
              <Card.Body>
                <h4 className="mb-4 text-center">فيديو تعريفى عن الكورس</h4>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    width="100%"
                    height="350"
                    src={getYouTubeEmbedUrl(course.courseLink)}
                    title="Course Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <Card.Body>
                <h5 className="text-center text-muted">لا يوجد فيديو تعريفي لهذا الكورس.</h5>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CoursesDetails;
