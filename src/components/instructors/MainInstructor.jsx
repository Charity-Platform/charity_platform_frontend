import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './MainInstructor.css';
import { useNavigate } from 'react-router-dom';

const MainInstructor = () => {
  const [mentors, setMentors] = useState([]); // Store mentor data
  const [loading, setLoading] = useState(true); // Show loading spinner or message
  const [error, setError] = useState(null); // Handle error messages
  const navigate = useNavigate(); // React Router navigation function

  // Fetch active mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`);
        setMentors(response.data.data || []); // Use an empty array if no data is present
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.');
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Navigate to details page for a specific mentor
  const handleDetails = (id) => {
    navigate(`/InstructorDetails/${id}`);
  };

  // Responsive configuration for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Display loading message while data is being fetched
  if (loading) {
    return <p className="loading-text">جاري تحميل البيانات...</p>;
  }

  // Display error message if data fetching fails
  if (error) {
    return <p className="error-text" style={{ color: 'red' }}>{error}</p>;
  }

  // Display a message if no mentor data is available
  if (mentors.length === 0) {
    return <p className="no-data-text">لا يوجد مستشارون متاحون حالياً. يرجى المحاولة لاحقاً.</p>;
  }

  // Render the carousel of mentors
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
          <div className="p-2" key={mentor._id}>
            <Card style={{ width: '25rem', height: '32rem' }}>
              <Card.Img 
                variant="top" 
                src={mentor.image || 'default-image.jpg'} 
                className="card-image" 
                alt={mentor.name || 'Default Image'} 
              />
              <Card.Body>
                <Card.Title className="mb-2">المستشار : {mentor.name}</Card.Title>
                <Card.Text className="job-description">
                  <h5 className="job-description-text mb-4" style={{ color: '#07a79d' }}>{mentor.field}</h5>
                </Card.Text>
                <Card.Text className="location">
                  <h5 className="text-location">
                    {mentor.address} <i className="fa-solid fa-location-dot fa-bounce location-icon" style={{ color: '#07a79d' }}></i>
                  </h5>
                </Card.Text>
              </Card.Body>
              <button className="btn-card" onClick={() => handleDetails(mentor._id)}>استشرنى</button>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MainInstructor;
