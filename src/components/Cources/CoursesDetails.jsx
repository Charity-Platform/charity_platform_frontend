import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './Cources.css'; // Make sure to have a similar CSS file like the one for books

const CoursesDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${id}`, {
          withCredentials: true,
        });
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleShowAllVideos = () => {
    navigate(`/CourseVideos/${id}`); // Navigate to CourseVideos page with course ID
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>Error fetching course details: {error}</p>;
  }

  if (!course) {
    return <p>No course details available.</p>;
  }

  return (
    <Container className="course-details-container my-5">
      {/* Back to main courses page button */}
      <div className="text-center mb-3">
        <Button className="btn-back" onClick={() => navigate('/Cources')}>
          العودة إلى الصفحة الرئيسية للكورسات
        </Button>
      </div>

      <Row className="align-items-center" >
        <Col md={6} className="text-center">
          <img src={course.image} alt={course.title} className="course-detail-image" />
        </Col>
        <Col md={6}>
          <h1 className="course-detail-title">{course.title}</h1>
          <p className="course-detail-price"><strong>سعر الكورس :</strong> {course.price} دينار</p>
          <p className="course-detail-description"><strong>الوصف :</strong> {course.description}</p>
          <p className="course-detail-field"><strong>المجال :</strong> {course.field}</p>

          {/* Show all videos button */}
          <Button className="btn-primary mt-3 w-100" onClick={handleShowAllVideos}>
            مشاهدة جميع الفيديوهات
          </Button>

          {/* Course Rating */}
          <div className="course-rating mt-3">
            <span>التقييم: {course.rating} ★</span>
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
    </Container>
  );
};

export default CoursesDetails;
