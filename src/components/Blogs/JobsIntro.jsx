import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Blog.css'

const JobsIntro = () => {
  return (
    <Container className="jobs-intro text-center bg-light py-5 rounded shadow-sm">
      <h2 className="jobs-title text-dark mb-3">
        اكتشف جميع الوظائف المتاحة على منصتنا
      </h2>
      <p className="jobs-description text-secondary mb-5">
        تصفح العديد من الفرص الوظيفية المناسبة لجميع المهارات والمستويات. انضم الآن وابدأ رحلتك المهنية معنا.
      </p>

      {/* Section for Institutions */}
      <Row className="mb-5">
        <Col md={6}>
          <div className="institution-section bg-white p-4 rounded shadow-lg hover-shadow">
            <h4 className="text-primary mb-3">إذا كنت مؤسسة، يمكنك عرض الوظائف المتاحة</h4>
            <p className="text-muted mb-4">
              إذا كنت تمتلك وظائف شاغرة وترغب في التواصل مع أفضل الكفاءات، قم بعرض الوظائف المتاحة لديك على منصتنا الآن.
            </p>
            <Link to="/comunity_platform">
              <Button className="btn-success px-4 py-2 hover-btn">
                تقديم طلب لعرض الوظائف
              </Button>
            </Link>
          </div>
        </Col>

        {/* Section for Job Seekers */}
        <Col md={6}>
          <div className="job-seeker-section bg-white p-4 rounded shadow-lg hover-shadow">
            <h4 className="text-primary mb-3">إذا كنت تبحث عن وظيفة، تواصل معنا مباشرة</h4>
            <p className="text-muted mb-4">
              نحن هنا لمساعدتك في العثور على الوظيفة المناسبة لك. تواصل معنا وسنعمل جاهدين لتوفير فرصتك في أسرع وقت.
            </p>
            <Link to="/job_form">
              <Button className="btn-info px-4 py-2 hover-btn">
                تواصل معنا
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Button for All Jobs */}
      <Link to="/jobs">
        <Button className="jobs-button btn-danger px-5 py-3 mt-4 hover-btn">
          عرض جميع الوظائف
        </Button>
      </Link>
    </Container>
  );
};

export default JobsIntro;
