import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Card, Modal, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../Mentor.css'; // Import the CSS file

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videoData, setVideoData] = useState({ title: '', url: '', description: '', image: '' });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
        setCourse(response.data);
        if (response.data.videos) {
          setVideos(response.data.videos);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleCreateVideo = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_MAIN_URL}videos`, { ...videoData, course: courseId }, { withCredentials: true });
      alert('Video created successfully!');
      setVideoData({ title: '', url: '', description: '', image: '' });
      setShowVideoModal(false);
      // Fetch updated videos
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error creating video:', error);
      alert('Failed to create video. Please try again.');
    }
  };

  const handleUpdateVideo = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}videos/${editingVideo._id}`, videoData, { withCredentials: true });
      alert('Video updated successfully!');
      setEditingVideo(null);
      setVideoData({ title: '', url: '', description: '', image: '' });
      setShowVideoModal(false);
      // Fetch updated videos
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Failed to update video. Please try again.');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}videos/${videoId}`, { withCredentials: true });
      alert('Video deleted successfully!');
      // Fetch updated videos
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url; // Return the original URL if not a YouTube link
  };

  return (
    <div className="course-details-container">
      {course ? (
        <div className="course-details-content">
          <Row>
            <Col md={9} className="course-info">
              <h2>{course.title}</h2>
              <Card>
                <Card.Img variant="top" src={`${import.meta.env.VITE_MAIN_URL}images/${course.image}`} alt={course.title} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Price: ${course.price}</Card.Subtitle>
                  <Card.Text><strong>Field:</strong> {course.field}</Card.Text>
                  <Card.Text><strong>Course Link:</strong> <a href={course.courseLink} target="_blank" rel="noopener noreferrer">Watch Course</a></Card.Text>
                </Card.Body>
              </Card>
              <Button variant="primary" onClick={() => setShowVideoModal(true)}>Create Video</Button>
            </Col>

            <Col md={3} className="course-videos">
              <h3>Course Videos</h3>
              {videos.length > 0 ? (
                <div className="videos-list">
                  {videos.map((video) => (
                    <div key={video._id} className="video-item">
                      <h5>{video.title}</h5>
                      <p>{video.description}</p>
                      <div className="video-player">
                        <iframe
                          width="100%"
                          height="200"
                          src={getYouTubeEmbedUrl(video.url)}
                          title={video.title}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <img src={video.image} alt={video.title} style={{ width: '100px', height: 'auto' }} />
                      <div className="video-actions">
                        <Button
                          variant="warning"
                          onClick={() => {
                            setEditingVideo(video);
                            setVideoData({
                              title: video.title,
                              url: video.url,
                              description: video.description,
                              image: video.image,
                            });
                            setShowVideoModal(true);
                          }}
                        >
                          Update
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteVideo(video._id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No videos available for this course.</p>
              )}
            </Col>
          </Row>

          {/* Video Creation / Update Modal */}
          <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{editingVideo ? 'Update Video' : 'Create a New Video'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formVideoTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={videoData.title}
                    onChange={handleVideoChange}
                    placeholder="Enter video title"
                  />
                </Form.Group>
                <Form.Group controlId="formVideoUrl">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={videoData.url}
                    onChange={handleVideoChange}
                    placeholder="Enter video URL"
                  />
                </Form.Group>
                <Form.Group controlId="formVideoDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={videoData.description}
                    onChange={handleVideoChange}
                    placeholder="Enter video description"
                  />
                </Form.Group>
                <Form.Group controlId="formVideoImage">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={videoData.image}
                    onChange={handleVideoChange}
                    placeholder="Enter image URL"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowVideoModal(false)}>Close</Button>
              <Button
                variant="primary"
                onClick={editingVideo ? handleUpdateVideo : handleCreateVideo}
              >
                {editingVideo ? 'Update Video' : 'Create Video'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetails;
