import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";

const GetAllApplicantJob = () => {
  const { jobId } = useParams(); // Get jobId from route parameters
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null); // Store selected applicant for modal

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}jobs/applications/${jobId}`,
          { withCredentials: true }
        );
        console.log(response.data.applications);
        // Ensure applicants is an array
        if (Array.isArray(response.data.applications)) {
          setApplicants(response.data.applications);
        } else {
          setError("البيانات غير صحيحة.");
        }
      } catch (err) {
        setError("يوجد مشكلة فى جلب بيانات المتقدمين.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal
    setSelectedApplicant(null); // Clear selected applicant
  };

  const handleWhatsApp = () => {
    if (selectedApplicant) {
      const whatsappLink = `https://wa.me/${selectedApplicant.phone}`;
      window.open(whatsappLink, "_blank"); // Open WhatsApp chat with the applicant
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-lg">جاري التحميل، يرجى الانتظار...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">المتقدمين للوظيفة</h1>

      {applicants.length === 0 ? (
        <div className="text-center text-lg text-muted">
          لا يوجد متقدمين لهذه الوظيفة حاليا.
        </div>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {applicants.map((applicant) => (
            <Col key={applicant._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{applicant.fullName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{applicant.email}</Card.Subtitle>
                  <Card.Text>رقم الهاتف: {applicant.phone}</Card.Text>
                  <Card.Text>العمر: {applicant.age} سنة</Card.Text>
                  <Card.Text>سنوات الخبرة: {applicant.yearsOfExperience}</Card.Text>
                  
                  <Card.Text>
                    <strong>التغطية:</strong> {applicant.coverLetter || "لا توجد رسالة تغطية."}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleOpenModal(applicant)}
                  >
                    تواصل عبر واتساب
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for Contact */}
      {modalOpen && selectedApplicant && (
        <Modal show={modalOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>التواصل مع {selectedApplicant.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>البريد الإلكتروني:</strong> {selectedApplicant.email}</p>
            <p><strong>رقم الهاتف:</strong> {selectedApplicant.phone}</p>
            <div className="text-center">
              <Button variant="success" onClick={handleWhatsApp}>
                فتح واتساب
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              غلق
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default GetAllApplicantJob;
