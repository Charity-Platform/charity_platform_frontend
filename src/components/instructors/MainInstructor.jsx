import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './MainInstructor.css';
import { useNavigate } from 'react-router-dom';

const MainInstructor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedMentor, setSelectedMentor] = useState(null); // Selected mentor's details
  const navigate = useNavigate();

  // Fetch active mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}mentors/active`);
        setMentors(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.');
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);
  // Navigate to details page for a specific mentor
  const handleNavigateDetails = (id) => {
    navigate(`/InstructorDetails/${id}`);
  };
  // Show mentor details in a modal
  const handleDetails = (mentor) => {
    setSelectedMentor(mentor); // Set the selected mentor to be displayed in the modal
    setShowModal(true); // Show the modal
  };

  // Hide the modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedMentor(null); // Reset selected mentor when modal is closed
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

  if (loading) {
    return <p className="loading-text">جاري تحميل البيانات...</p>;
  }

  if (error) {
    return <p className="error-text" style={{ color: 'red' }}>{error}</p>;
  }

  if (mentors.length === 0) {
    return <p className="no-data-text">لا يوجد مستشارون متاحون حالياً. يرجى المحاولة لاحقاً.</p>;
  }

  return (
    <div className="container text-center instructor-section">
      <h1 className="heading w-2 p-5 text-center-instructor"></h1>
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
              <div className=""> 
                <button className="btn-card w-50" style={{backgroundColor:'#07a79d' , color:"#fff"}} onClick={() => handleNavigateDetails(mentor._id)}>استشرنى</button>
                <button className="btn-card" onClick={() => handleDetails(mentor)}>تفاصيل </button>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>

      {/* Mentor Details Modal */}
      {selectedMentor && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل المستشار   :   {selectedMentor.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body dir='rtl'>
            <div>
              {/* <h3 className="mt-3">{selectedMentor.name}</h3> */}
              <p><strong>التخصص : </strong>{selectedMentor.field}</p>
              <p><strong>الموقع : </strong>{selectedMentor.address}</p>
              <p><strong>الوصف  : </strong>{selectedMentor.description || 'لا يوجد وصف لهذا المستشار.'}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>إغلاق</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MainInstructor;
