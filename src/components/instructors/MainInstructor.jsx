import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './MainInstructor.css';
import { useNavigate } from 'react-router-dom';

const MainInstructor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const navegate=useNavigate();

  // Fetch active mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`);
        setMentors(response.data.data); // Assuming response.data.data contains the mentor array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

const handeldetails = (id)=>{
  navegate(`/InstructorDetails/${id}`);
}

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  if (loading) {
    return <p>Loading mentors...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container text-center instructor-section">
      <Carousel 
        responsive={responsive}
        swipeable={true}
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={3000} // Auto-play speed in milliseconds
        infinite={true}
      >
        {mentors.map((mentor) => (
          <div className="p-2" key={mentor._id}>
            <Card style={{ width: '25rem', height: '32rem' }}>
              <Card.Img variant="top" src={mentor.image || 'default-image.jpg'} className='card-image' />
              <Card.Body>
                <Card.Title>الدكتور : {mentor.name}</Card.Title>
                <Card.Text className='job-description'>
                  <h5 className='job-description-text'>{mentor.email}</h5>
                </Card.Text>
                <Card.Text className='location'>
                  <h5 className='text-location'>
                    {mentor.field} <i className="fa-solid fa-location-dot fa-bounce location-icon" style={{color: "#07a79d"}}></i>
                  </h5>
                </Card.Text>
              </Card.Body>
              <button className="btn-card" onClick={()=>handeldetails(mentor._id)}>استشرنى</button>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MainInstructor;
