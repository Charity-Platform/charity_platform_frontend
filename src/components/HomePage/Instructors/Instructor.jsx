import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // To fetch data from the API
import './Instructors.css';
import 'react-multi-carousel/lib/styles.css'; // Required styles for carousel

const Instructor = () => {
  const [mentors, setMentors] = useState([]); // State to store mentors data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navegate = useNavigate();
  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`); // Adjust the URL as needed
        setMentors(response.data.data); // Assuming response.data contains the mentor array
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error state if the API request fails
        setLoading(false); // Stop loading if there is an error
      }
    };

    fetchMentors();
  }, []);

  const handeldetails = (id)=>{
    navegate(`/InstructorDetails/${id}`);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to the top
    });
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (loading) {
    return <p>Loading mentors...</p>; // Show loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if the API call fails
  }

  return (
    <div className="container text-center instructor-section">
      <h1 className="heading w-2 p-5 text-center-instructor">المستشارين</h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={3000} // Auto-play speed in milliseconds
        infinite={true}
      >
        {mentors.map((mentor) => (
          <div className="p-2 card-total" key={mentor._id}>
            <Card style={{ width: '25rem', height: '32rem' }} className="card">
              <Card.Img variant="top" src={mentor.image || 'default-image.jpg'} className="card-image" />
              <Card.Body>
                <Card.Title>الدكتور : {mentor.name}</Card.Title>
                <Card.Text className="job-description">
                  <h5 className="job-description-text">{mentor.field}</h5>
                </Card.Text>
                <Card.Text className="location">
                  <h5 className="text-location">
                    {mentor.field} <i className="fa-solid fa-location-dot fa-bounce location-icon" style={{ color: '#07a79d' }}></i>
                  </h5>
                </Card.Text>
              </Card.Body>
              <button className="btn-card" onClick={()=>handeldetails(mentor._id)}>استشرنى</button>
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
