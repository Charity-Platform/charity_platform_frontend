import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa'; // Import play icon

const CourseVideos = () => {
  const { id } = useParams(); // Get course ID from URL
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the selected video
 const navegate =useNavigate();
 
  useEffect(() => {
    const fetchCourseVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${id}`, {
          withCredentials: true,
        });
        if (response.data.videos) {
          setVideos(response.data.videos);
          setSelectedVideo(response.data.videos[0]); // Set the first video as selected by default
        } else {
          setError('No videos found for this course.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseVideos();
  }, [id]);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  if (error) {
    return <p>Error fetching videos: {error}</p>;
  }

  if (!videos.length) {
    return <p>No videos available.</p>;
  }

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  return (
    <Container className="py-5">
        <Button 
            variant="primary" 
            className="mb-5 m-3" 
            onClick={() => navegate('/Cources')} // Navigate to the main page when clicked
          >
            الرئيسية 
          </Button>
          <Button 
            variant="primary" 
            className="mb-5 m-3" 
            onClick={() => navegate(`/CoursesDetails/${id}`)} // Navigate to the main page when clicked
          >
            الرجوع إلى تفاصيل الكورس  
          </Button>
      <Row>
      
        <Col md={8}>
          {selectedVideo && (
            <div>
              <h1>{selectedVideo.title}</h1>
              <iframe 
                width="100%" 
                height="500" 
                src={getYouTubeEmbedUrl(selectedVideo.url)} 
                title={selectedVideo.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
          )}
        </Col>
        <Col md={4}>
          <h3>كل الفيديوهات </h3>
          <ListGroup>
            {videos.map(video => (
              <ListGroup.Item 
                key={video._id} 
                onClick={() => setSelectedVideo(video)} 
                style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                className={`video-list-item ${selectedVideo === video ? 'active-video' : ''}`} // Add a class for active video
              >
                {selectedVideo === video && <FaPlay className="me-2" />} {/* Show icon for active video */}
                {video.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseVideos;
