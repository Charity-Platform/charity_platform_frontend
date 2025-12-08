import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from '../../api/axios';
import { retryApiCall } from '../../api/apiHelpers';
import { useNavigate } from 'react-router-dom';
import './Cources.css'; // Add a CSS file for additional styles

const CardCources = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const fetchCourses = async () => {
      try {
        console.log('📥 Fetching courses...');
        const response = await retryApiCall(
          () => axios.get('courses'),
          3
        );
        
        console.log('API Response:', response.data);

        if (isMounted) {
          if (response.data && Array.isArray(response.data.document)) {
            console.log(`✅ Loaded ${response.data.document.length} courses`);
            setCourses(response.data.document);
          } else {
            throw new Error('Unexpected API response format');
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('❌ Error fetching courses:', err);
        if (isMounted) {
          setError(err.message || 'An unexpected error occurred.');
          setLoading(false);
        }
      }
    };

    fetchCourses();
    
    return () => {
      isMounted = false;
      console.log('🧹 Cleanup: Courses component unmounted');
    };
  }, []);

  const handleEnrollClick = (courseId) => {
    console.log('Navigating to course ID:', courseId);
    navigate(`/CoursesDetails/${courseId}`);
  };

  if (loading) {
    return <p>جارى تحميل الكورسات .......</p>;
  }

  if (error) {
    return <p>حدث خطأ أثناء تحميل الكورسات: {error}</p>;
  }

  return (
    <Container className="py-5">
      <div className="heading-title">
        <h1>الكورسات التدريبية</h1>
      </div>

      {/* Conditionally render if no courses */}
      {courses.length === 0 ? (
        <div className="text-center mt-5">
          <h3>لا يوجد كورسات حالياً</h3>
          <p>عُذرًا، لا توجد دورات متاحة في الوقت الحالي. عُد لاحقًا للمزيد!</p>
        </div>
      ) : (
        <Row className="justify-content-center">
          {courses.map((course) => (
            <Col md={4} lg={3} key={course._id} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Img
                  variant="top"
                  src={course.image || 'default-course-image.jpg'} // Use a default image if none is provided
                  alt={course.title}
                  className="card-img align-self-center"
                />
                <Card.Body>
                  <Card.Title>{course.title || 'عنوان الدورة غير متوفر'}</Card.Title>
                  <Card.Text>المجال: {course.field || 'غير محدد'}</Card.Text>
                  <Card.Text>السعر: {course.price ? `${course.price} دينار` : 'غير محدد'}</Card.Text>
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
