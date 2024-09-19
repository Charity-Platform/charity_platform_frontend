import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

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
    <Container className="py-5">
      <Row className="g-4">
        <Col md={8}>
          <Card className="shadow-lg mb-4" dir='rtl'>
            <Card.Img variant="top" src={course.image} alt={course.title} />
            <Card.Body>
              <Card.Title className="mb-3">{course.title}</Card.Title>
              <Card.Text>
                <strong>سعر الكورس :</strong> {course.price} ج.م.
              </Card.Text>
              <Card.Text>
                <strong>الوصف :</strong> {course.description}
              </Card.Text>
              <Card.Text>
                <strong>المجال :</strong> {course.field}
              </Card.Text>
              <Button 
                variant="success" 
                className="mt-3 w-100" 
                onClick={handleShowAllVideos}
              >
                شراء الكورس
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {course.courseLink ? (
            <Card className="shadow-lg">
              <Card.Body>
                <h4 className="mb-4 text-center">فيديو تعريفى عن الكورس </h4>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    width="100%"
                    height="250"
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
                <h5 className="text-center text-muted">No video available for this course.</h5>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CoursesDetails;
