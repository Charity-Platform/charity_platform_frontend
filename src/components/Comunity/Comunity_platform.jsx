import React, { useState } from 'react';
import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';
import './CommunityPlatform.css'; // Custom CSS file

const Community_Platform = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (replace this with API call)
    console.log({
      jobTitle,
      companyName,
      location,
      jobDescription,
    });
    // Clear form after submission
    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setJobDescription('');
  };

  return (
    <div className="community-platform">
      {/* Top Section with Arabic Description */}
      <div className="description-section">
        <Container>
          <h1 className="text-center text-white">إنشاء إعلان وظيفي</h1>
          <p className="text-center text-white mt-3">
            مرحبًا بكم في منصة المجتمع! هنا يمكن للشركات إنشاء إعلانات وظيفية، والتواصل مع المرشحين المحتملين، وتقديم معلومات مفصلة حول الفرص الوظيفية المتاحة. املأ النموذج أدناه لنشر وظيفتك والعثور على المواهب المناسبة لشركتك.
          </p>
        </Container>
      </div>

      {/* Job Advertisement Form */}
      <Container className="job-ad-form mt-5">
        <Card className="p-4 shadow">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formJobTitle" className="mb-3">
              <Form.Label column sm={2}>
                المسمى الوظيفي:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="أدخل المسمى الوظيفي"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCompanyName" className="mb-3">
              <Form.Label column sm={2}>
                اسم الشركة:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="أدخل اسم الشركة"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formLocation" className="mb-3">
              <Form.Label column sm={2}>
                الموقع:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="أدخل موقع العمل"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formJobDescription" className="mb-3">
              <Form.Label column sm={2}>
                وصف الوظيفة:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="اكتب وصفًا تفصيليًا للوظيفة"
                  required
                />
              </Col>
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
              نشر الوظيفة
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Community_Platform;
