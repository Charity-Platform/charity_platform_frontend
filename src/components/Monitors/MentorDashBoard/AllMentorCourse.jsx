import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Form, Spinner, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllMentorCourse = () => {
  const { mentorId } = useParams();
  const [courses, setCourses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCourseData, setUpdateCourseData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!mentorId) {
        setError('معرّف المدرب غير متوفر.');
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}courses/mentor/${mentorId}`,
          { withCredentials: true }
        );
        setCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('خطأ أثناء جلب الكورسات:', error.response ? error.response.data : error.message);
        setError('فشل تحميل الكورسات. يرجى المحاولة مرة أخرى.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [mentorId]);

  const handleOpenUpdateModal = (course) => {
    setUpdateCourseData(course);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdateCourseData({});
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateCourseData({ ...updateCourseData, [name]: value });
  };

  const handleUpdateCourse = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_MAIN_URL}courses/${updateCourseData._id}`, updateCourseData, {
        withCredentials: true,
      });
      toast.success('تم تحديث الكورس بنجاح!');
      setCourses(courses.map((course) => (course._id === updateCourseData._id ? updateCourseData : course)));
      handleCloseUpdateModal();
    } catch (error) {
      console.error('خطأ أثناء تحديث الكورس:', error);
      toast.error('فشل في تحديث الكورس. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}courses/${courseId}`, { withCredentials: true });
      setCourses(courses.filter((course) => course._id !== courseId));
      toast.success('تم حذف الكورس بنجاح!');
    } catch (error) {
      console.error('خطأ أثناء حذف الكورس:', error);
      toast.error('فشل في حذف الكورس. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleShowDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">الكورسات الخاصة بك</h2>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : courses.length > 0 ? (
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4 mb-4">
              <Card>
                <Card.Img variant="top" src={course.image} alt={course.title} />
                <Card.Body>
                  <Card.Title>
                    <strong>العنوان:</strong> {course.title}
                  </Card.Title>
                  <Card.Text>
                    <strong>تفاصيل الكورس:</strong> {course.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>السعر:</strong> ${course.price}
                  </Card.Text>
                  <Card.Text>
                    <strong>التخصص:</strong> {course.field}
                  </Card.Text>
                  <Card.Text>
                    <strong>رابط الفيديو التعريفي:</strong>{' '}
                    <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
                      تشغيل الفيديو
                    </a>
                  </Card.Text>
                  <ButtonGroup className="d-flex m-2">
                    <Button variant="info" onClick={() => handleShowDetails(course._id)} className=' m-1'>
                      إضافة فيديوهات للكورس
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenUpdateModal(course)} className=' m-1'> 
                      تعديل
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteCourse(course._id)} style={{backgroundColor:'red'}} >
                      حذف
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">لا توجد كورسات مسجلة.</p>
      )}

      {/* تحديث بيانات الكورس */}
      {showUpdateModal && (
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>تحديث بيانات الكورس</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCourseTitle">
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={updateCourseData.title || ''}
                  onChange={handleUpdateChange}
                  placeholder="أدخل عنوان الكورس"
                />
              </Form.Group>
              <Form.Group controlId="formCourseDescription">
                <Form.Label>تفاصيل الكورس</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={updateCourseData.description || ''}
                  onChange={handleUpdateChange}
                  placeholder="أدخل تفاصيل الكورس"
                />
              </Form.Group>
              <Form.Group controlId="formCoursePrice">
                <Form.Label>السعر</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={updateCourseData.price || ''}
                  onChange={handleUpdateChange}
                  placeholder="أدخل سعر الكورس"
                />
              </Form.Group>
              <Form.Group controlId="formCourseField">
                <Form.Label>التخصص</Form.Label>
                <Form.Control
                  type="text"
                  name="field"
                  value={updateCourseData.field || ''}
                  onChange={handleUpdateChange}
                  placeholder="أدخل تخصص الكورس"
                />
              </Form.Group>
              <Form.Group controlId="formCourseImage">
                <Form.Label>رابط الصورة</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={updateCourseData.image || ''}
                  onChange={handleUpdateChange}
                  placeholder="أدخل رابط الصورة"
                />
              </Form.Group>
              <Form.Group controlId="formCourseLink">
                <Form.Label>رابط الفيديو</Form.Label>
                <Form.Control
                  type="text"
                  name="courseLink"
                  value={updateCourseData.courseLink || ''}
                  onChange={handleUpdateChange}
                  placeholder="أدخل رابط الفيديو"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              إغلاق
            </Button>
            <Button variant="primary" onClick={handleUpdateCourse}>
              تحديث الكورس
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
    </div>
  );
};

export default AllMentorCourse;
