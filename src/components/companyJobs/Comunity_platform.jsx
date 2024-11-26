import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation
import "./CommunityPlatform.css"; // Custom CSS file

const Community_Platform = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("remote");
  const [companyName, setCompanyName] = useState("");
  const [campanyWebsite, setCompanyWebsite] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      type: jobType,
      companyName,
      description: jobDescription,
      campanyWebsite,
      companyPhone,
      location,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}jobs`,
        jobData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Job posted successfully:", response.data);
      setIsSuccess(true); // Show success message

      // Clear form
      setJobTitle("");
      setJobType("remote");
      setCompanyName("");
      setCompanyWebsite("");
      setCompanyPhone("");
      setLocation("");
      setJobDescription("");
    } catch (error) {
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );
      alert("Failed to post the job. Please try again.");
    }
  };

  const handleCreateNewJob = () => {
    setIsSuccess(false); // Reset success state
  };

  const handleViewJobs = () => {
    navigate("/jobs"); // Navigate to the jobs page
  };

  return (
    <div className="community-platform">
      <div className="description-section">
        <Container>
          <h1 className="text-center text-white">إنشاء إعلان وظيفي</h1>
          <p className="text-center text-white mt-3">
            مرحبًا بكم في منصة المجتمع! هنا يمكن للشركات إنشاء إعلانات وظيفية،
            والتواصل مع المرشحين المحتملين، وتقديم معلومات مفصلة حول الفرص
            الوظيفية المتاحة. املأ النموذج أدناه لنشر وظيفتك والعثور على المواهب
            المناسبة لشركتك.
          </p>
        </Container>
      </div>

      <Container className="job-ad-form mt-5">
        {!isSuccess ? (
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

              <Form.Group as={Row} controlId="formJobType" className="mb-3">
                <Form.Label column sm={2}>
                  نوع العمل:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="select"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required
                  >
                    <option value="remote">عن بعد </option>
                    <option value="hybrid">مختلط</option>
                    <option value="onsite">فى المؤسسة </option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formCompanyName"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  اسم المؤسسة:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="أدخل اسم المؤسسة"
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formCompanyWebsite"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  موقع المؤسسة:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="url"
                    value={campanyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="أدخل موقع المؤسسة"
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formCompanyPhone"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  هاتف المؤسسة:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="أدخل رقم هاتف المؤسسة"
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formJobDescription"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  وصف الوظيفة:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="اكتب وصفًا تفصيليًا للوظيفة"
                    required
                  />
                </Col>
              </Form.Group>

              <Button type="submit" className="w-50" variant="primary">
                طلب نشر الوظيفة
              </Button>
            </Form>
          </Card>
        ) : (
          <Card className="p-4 shadow text-center">
            <h2 className="text-success">شكراً لتقديم طلب الوظيفة!</h2>
            <p> سوف يتم مراجعة طلبك فى اسرع وقت ونشر الوظيفة فى المنصة </p>
            <div className="d-flex justify-content-center mt-4">
              <Button
                className="me-3"
                variant="primary"
                onClick={handleCreateNewJob}
              >
                إنشاء إعلان جديد
              </Button>
              <Button variant="secondary" onClick={handleViewJobs}>
                عرض الوظائف
              </Button>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Community_Platform;
