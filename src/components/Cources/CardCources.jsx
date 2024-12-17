import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CardCources = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses`);
        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.document)) {
          setCourses(response.data.document);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnrollClick = (courseId) => {
    console.log('Navigating to course ID:', courseId);
    navigate(`/CoursesDetails/${courseId}`);
  };
  
  if (loading) {
    return <p>جارى تحميل الكورسات ....... </p>;
  }

  if (error) {
    return <p>حدث خطأ أثناء تحميل الكورسات: {error}</p>;
  }

  return (
    <Container className="py-5">
      <div className='heading-title'>
        <h1>الكورسات التدريبية</h1>
      </div>

      {/* Conditionally render when there are no courses */}
      {courses.length === 0 ? (
        <div className="text-center mt-5">
          <h3>لا يوجد كورسات حالياً</h3>
          <p>عُذرًا، لا توجد دورات متاحة في الوقت الحالي.</p>
        </div>
      ) : (
        <Row className="justify-content-center">
          {courses.map((course) => (
            <Col md={4} lg={3} key={course._id} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Img variant="top" src={course.image} alt={course.title} className='card-img' />
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>المجال : {course.field}</Card.Text>
                  <Card.Text>السعر: {course.price} دينار </Card.Text>
                  <Button 
                    className="btn btn-course" 
                    onClick={() => handleEnrollClick(course._id)}
                  >
                    تفاصيل الدورة
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CardCources;
