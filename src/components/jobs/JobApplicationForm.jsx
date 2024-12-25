import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplicationForm = () => {
  const { id: jobId } = useParams(); // Get the job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    pdf: null,
    yearsOfExperience: "",
    coverLitter: "",
    image: null, // New field for image upload
  });
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch job details by ID
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error.response?.data || error.message);
        setError("حدث خطأ أثناء تحميل بيانات الوظيفة.");
      }
    };
    fetchJobDetails();
  }, [jobId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for PDF and image
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading state to true

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("fullName", formData.fullName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("age", formData.age);
    formDataToSubmit.append("yearsOfExperience", formData.yearsOfExperience);
    formDataToSubmit.append("coverLitter", formData.coverLitter);
    if (formData.pdf) formDataToSubmit.append("pdf", formData.pdf);
    if (formData.image) formDataToSubmit.append("image", formData.image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}jobs/apply/${jobId}`,
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data)

      if (response.status === 200) {
        toast.success("تم إرسال طلبك بنجاح نتمنى لك التوفيق");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          age: "",
          pdf: null,
          yearsOfExperience: "",
          coverLitter: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error.response?.data || error.message);
      toast.error(`حدث خطأ أثناء إرسال الطلب: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container className="py-5">
      {error && <div className="alert alert-danger">{error}</div>}

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
              <strong>نوع الوظيفة:</strong> {jobDetails.type}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <p>جاري تحميل معلومات الوظيفة...</p>
      )}

      <Form onSubmit={handleSubmit}>
        <h4 className="mb-4">تقديم على الوظيفة</h4>

        <Form.Group controlId="fullName" className="mb-3">
          <Form.Label>الاسم الكامل</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
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

        <Form.Group controlId="age" className="mb-3">
          <Form.Label>العمر</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="كم عمرك"
          />
        </Form.Group>

        <Form.Group controlId="yearsOfExperience" className="mb-3">
          <Form.Label>سنوات الخبرة</Form.Label>
          <Form.Control
            type="text"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
            placeholder="أدخل عدد سنوات الخبرة"
          />
        </Form.Group>

        <Form.Group controlId="pdf" className="mb-3">
          <Form.Label>السيرة الذاتية (ملف PDF)</Form.Label>
          <Form.Control
            type="file"
            name="pdf"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="coverLitter" className="mb-3">
          <Form.Label>خطاب التغطية (اختياري)</Form.Label>
          <Form.Control
            as="textarea"
            name="coverLitter"
            value={formData.coverLitter}
            onChange={handleChange}
            placeholder="أدخل خطاب التغطية (اختياري)"
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>صورة شخصية (اختياري)</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "إرسال الطلب"}
        </Button>
        <Button
          variant="secondary"
          className="mt-3 mx-2"
          onClick={() => navigate("/jobs")}
        >
          العودة للوظائف
        </Button>
      </Form>
      <ToastContainer position="top-center" autoClose={5000} />
    </Container>
  );
};

export default JobApplicationForm;
