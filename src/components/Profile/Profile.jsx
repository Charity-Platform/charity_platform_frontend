import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const JobApplicationForm = () => {
  const { jobId } = useParams(); // Get the job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age:"",
    resume: null,
    message: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Fetch job details by ID
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
         `${import.meta.env.VITE_MAIN_URL}jobs/${id}`
        );
        setJobDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error.response?.data || error.message);
        setError("حدث خطأ أثناء تحميل بيانات الوظيفة.");
      }
    };
    fetchJobDetails();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for resume
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  // Submit the application form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("resume", formData.resume);
    formDataToSubmit.append("message", formData.message);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}jobs/apply/${jobId}`,
        formDataToSubmit
      );
      if(response.status === 200 ){
         setSuccess("تم إرسال طلبك بنجاح!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        age:"",
        resume: null,
        message: "",
        experience:"",
      });
      }
     
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
    }
  };

  return (
    <Container className="py-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {jobDetails ? (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>معلومات عن الوظيفة</Card.Title>
            <p>
              <strong>العنوان:</strong> {jobDetails.title}
            </p>
            <p>
              <strong>الوصف:</strong> {jobDetails.description}
            </p>
            <p>
             {jobDetails.type} <strong> : نوع الوظيفة</strong> 
            </p>
          </Card.Body>
        </Card>
      ) : (
        <p>جاري تحميل معلومات الوظيفة...</p>
      )}

      <Form onSubmit={handleSubmit}>
        <h4 className="mb-4">تقديم على الوظيفة</h4>

        <Form.Group controlId="name" className="mb-3">
          <Form.Label>الاسم الكامل</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="أدخل اسمك الكامل"
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>البريد الإلكتروني</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="أدخل بريدك الإلكتروني"
          />
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="أدخل رقم هاتفك"
          />
        </Form.Group>
        <Form.Group controlId="phone" className="mb-3">
          <Form.Label> العمر</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder=" كم عمرك  "
          />
        </Form.Group>
        <Form.Group controlId="phone" className="mb-3">
          <Form.Label> سنوات الخبرة </Form.Label>
          <Form.Control
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            placeholder="أدخل عدد سنوات الخبرة فى المجال "
          />
        </Form.Group>
        <Form.Group controlId="resume" className="mb-3">
          <Form.Label>السيرة الذاتية</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="message" className="mb-3">
          <Form.Label>رسالة إضافية</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="اكتب رسالة إضافية (اختياري)"
            rows={4}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          إرسال الطلب
        </Button>
        <Button
          variant="secondary"
          className="mt-3 mx-2"
          onClick={() => navigate("/jobs")}
        >
          العودة للوظائف
        </Button>
      </Form>
    </Container>
  );
};

export default JobApplicationForm;