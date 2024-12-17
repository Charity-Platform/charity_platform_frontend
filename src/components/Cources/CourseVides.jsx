import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa'; // Play icon

const CourseVideos = () => {
  const { id } = useParams(); // Get course ID from URL
  const [videos, setVideos] = useState([]); // Video list state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedVideo, setSelectedVideo] = useState(null); // Selected video state
  const navigate = useNavigate(); // For navigation

  // Fetch course videos
  useEffect(() => {
    const fetchCourseVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}courses/${id}`, 
          { withCredentials: true }
        );

        if (response.data.videos && response.data.videos.length > 0) {
          setVideos(response.data.videos);
          setSelectedVideo(response.data.videos[0]); // Set the first video as default
        } else {
          setError('لا يوجد فيديوهات متاحة لهذا الكورس حاليا');
        }
      } catch (err) {
        setError('حدث خطأ أثناء تحميل الفيديوهات، حاول لاحقا');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseVideos();
  }, [id]);

  // Extract YouTube embed link from a URL
  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  // Handle loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <h3>جاري تحميل الفيديوهات...</h3>
      </Container>
    );
  }

  // Handle error or empty state
  if (error || !videos.length) {
    return (
      <Container className="text-center py-5">
        <h3>{error || 'لا توجد فيديوهات متاحة حاليا'}</h3>
        <Button variant="primary" onClick={() => navigate('/Cources')}>
          العودة إلى الصفحة الرئيسية
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Navigation Buttons */}
      <Button 
        variant="primary" 
        className="mb-5 m-3" 
        onClick={() => navigate('/Cources')}
      >
        الرئيسية
      </Button>
      <Button 
        variant="primary" 
        className="mb-5 m-3" 
        onClick={() => navigate(`/CoursesDetails/${id}`)}
      >
        الرجوع إلى تفاصيل الكورس
      </Button>

      {/* Videos Section */}
      <Row>
        {/* Video Player Section */}
        <Col md={8}>
          {selectedVideo && (
            <div>
              <h2 className="mb-4">{selectedVideo.title}</h2>
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

        {/* Video List Section */}
        <Col md={4}>
          <h3>كل الفيديوهات</h3>
          <ListGroup>
            {videos.map((video) => (
              <ListGroup.Item
                key={video._id}
                onClick={() => setSelectedVideo(video)} // Set video on click
                style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                className={`d-flex align-items-center ${
                  selectedVideo === video ? 'bg-primary text-white' : ''
                }`}
              >
                {selectedVideo === video && <FaPlay className="me-2" />} {/* Play icon */}
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
