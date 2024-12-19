import { useState } from 'react';
import { Button, Card, Container, Dropdown, Row, Col } from 'react-bootstrap';
import { FaPlusCircle, FaEdit, FaTrash, FaUser, FaList, FaMoneyCheckAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const RightSideMentor = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const { mentorId } = useParams();

  // Navigation handlers
  const handleViewAllCourses = () => navigate(`/all-courses/${mentorId}`);
  const handleMakeInstruction = () => navigate('/instructions');
  const handleShowInstructions = () => navigate(`/allinstructions/${mentorId}`);
  const handleNewCourse = () => navigate(`/new_courses`);
  const handleShowCourses = () => navigate(`/all_books/${mentorId}`);
  const handleViewSalary = () => navigate(`/dashbord/acceptedsalary/${mentorId}`);

  // Modal handlers
  const handleProfileModalOpen = () => setShowProfileModal(true);
  const handleProfileModalClose = () => setShowProfileModal(false);

  return (
    <Container className="mentor-admin">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-center">صفحة التحكم الخاصة بالمستشار</h1>
        <Dropdown>
          <Dropdown.Toggle variant="link" id="profile-dropdown" className="p-0">
            <FaUser size={30} /> {/* User Icon */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/">رجوع للموقع</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Main Content */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>كل ادوات التحكم لديكم</Card.Title>
          <Card.Text>
            هذه الصفحة مخصصة لاضافة الدورات التدريبية، الكتب، أو الاستشارات، وإدارة الرواتب.
          </Card.Text>

          {/* Action Buttons */}
          <Row className="mb-3">
            <Col md={4}>
              <Button variant="success" className="w-100 mb-2" onClick={() => navigate(`/CreateCourse/${mentorId}`)}>
                <FaPlusCircle /> إضافة دورة جديدة
              </Button>
              <Button variant="info" className="w-100" onClick={handleViewAllCourses}>
                <FaList /> عرض جميع الدورات الخاصة بى
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="success" className="w-100 mb-2" onClick={handleMakeInstruction}>
                <FaPlusCircle /> إضافة استشارة جديدة
              </Button>
              <Button variant="info" className="w-100" onClick={handleShowInstructions}>
                <FaList /> عرض جميع الإستشارات
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="success" className="w-100 mb-2" onClick={handleNewCourse}>
                <FaPlusCircle /> إضافة كتاب جديد
              </Button>
              <Button variant="info" className="w-100" onClick={handleShowCourses}>
                <FaList /> عرض جميع الكتب
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Button variant="primary" className="w-100" onClick={handleViewSalary}>
                <FaMoneyCheckAlt /> التعاملات المالية
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RightSideMentor;
