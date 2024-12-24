import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Instructors.css';

const Instructor = () => {
  const [mentors, setMentors] = useState([]); // State to store mentors data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`); 
        const data = response.data.data;

        if (data && data.length > 0) {
          setMentors(data);
        } else {
          setMentors([]);
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('حدث خطأ أثناء جلب بيانات المستشارين. حاول مرة أخرى.');
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleDetails = (id) => {
    navigate(`/InstructorDetails/${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { 
      breakpoint: { max: 464, min: 0 }, 
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  if (loading) {
    return <p className="loading-text">جاري تحميل البيانات...</p>;
  }

  if (error) {
    return <p className="error-text" style={{ color: 'red' }}>{error}</p>;
  }

  if (mentors.length === 0) {
    return (
      <p className="no-data-text">
        لا يوجد مستشارون متاحون حالياً. يرجى المحاولة لاحقاً.
      </p>
    );
  }

  return (
    <div className="container text-center instructor-section">
      <h1 className="heading w-2 p-5 text-center-instructor">المستشارين</h1>

      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
      >
        {mentors.map((mentor) => (
          <div className="p-2 card-total" key={mentor._id}>
            <Card style={{ width: '25rem', height: '32rem' }} className="card">
              <Card.Img
                variant="top"
                src={mentor.image || 'default-image.jpg'} // Use default image if mentor image is unavailable
                alt={mentor.name}
                className="card-image"
              />
              <Card.Body>
                <Card.Title>المستشار : {mentor.name}</Card.Title>
                <Card.Text className="job-description">
                  <h5>{mentor.field}</h5>
                </Card.Text>
                <Card.Text className="location">
                  <h5>
                    {mentor.address}{' '}
                    <i
                      className="fa-solid fa-location-dot fa-bounce location-icon"
                      style={{ color: '#07a79d' }}
                    ></i>
                  </h5>
                </Card.Text>
              </Card.Body>
              <button className="btn-card" onClick={() => handleDetails(mentor._id)}>
                استشرنى
              </button>
            </Card>
          </div>
        ))}
      </Carousel>

      <Link to="/instructors" onClick={scrollToTop}>
        <div className="btn-more">
          <button className="btn-more-dir">عرض الجميع</button>
        </div>
      </Link>
    </div>
  );
};

export default Instructor;
