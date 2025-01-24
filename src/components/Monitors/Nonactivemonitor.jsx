import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nonactivemonitor = () => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState("");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [fees, setFees] = useState("");
  const [mentorDetails, setMentorDetails] = useState(null); // To store mentor details for the modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}mentors/not-active`,
          {
            withCredentials: true,
          }
        );

        const mentorsData = response.data.data;
        const message = response.data.message;
        if (Array.isArray(mentorsData) && mentorsData.length > 0) {
          setMentors(mentorsData);
        } else if (message) {
          setError(message);
        } else {
          setError("No mentors found.");
        }
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to fetch mentors.");
      }
    };

    fetchMentors();
  }, []);

  const handleAccept = async () => {
    if (!selectedMentorId || fees === "") {
      setError("Please select a mentor and enter a fee.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}mentors/accept/${selectedMentorId}`,
        { fees },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Mentor accepted successfully!");
        setShowAcceptModal(false);
        setFees("");
        setMentors((prevMentors) =>
          prevMentors.filter((mentor) => mentor._id !== selectedMentorId)
        );
      } else {
        setError(`Failed to accept mentor. Status code: ${response.status}`);
      }
    } catch (err) {
      console.error(
        "Error accepting mentor:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to accept mentor.");
    }
  };

  const fetchMentorDetails = async (id) => {
    if (!id) {
      setError("Mentor ID is missing.");
      console.error("Mentor ID is missing.");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}mentors/${id}`,
        {
          withCredentials: true,
        }
      );
      setMentorDetails(response.data);
      console.log(response.data);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Error fetching mentor details:", err);
      setError("Failed to fetch mentor details.");
    }
  };

  return (
    <Container className="mt-5" dir="rtl">
      <Button
        variant="primary"
        onClick={() => navigate("/dashboard")}
        className="mb-4"
      >
        الصفحة الرئيسية
      </Button>

      {error && <p className="text-danger text-center">{error}</p>}

      <Row>
        {mentors.length > 0
          ? mentors.map((mentor) => (
              <Col xs={6} key={mentor._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>الاسم : {mentor.name}</Card.Title>
                    <Card.Text>
                      <strong>البريد الإلكترونى :</strong> {mentor.email}
                      <br />
                      <strong>رقم الهاتف :</strong> {mentor.phone}
                      <br />
                      <strong>التخصص :</strong> {mentor.field}
                      <br />
                      <strong>معلومات اضافية :</strong> {mentor.description}
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => {
                        setSelectedMentorId(mentor._id);
                        setShowAcceptModal(true);
                      }}
                    >
                      قبول المستشار فى المنصة
                    </Button>{" "}
                    {mentors.map((mentor) => (
                      <Button
                        key={mentor._id}
                        variant="info"
                        onClick={() => fetchMentorDetails(mentor._id)} // Ensure mentor._id exists
                      >
                        عرض التفاصيل
                      </Button>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            ))
          : !error && (
              <p className="text-center text-muted">
                لا يوجد مستشارين غير نشطين.
              </p>
            )}
      </Row>

      {/* Modal to enter fees for accepting mentor */}
      <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>إدخال نسبة الخصم للمستشار</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFees">
              <Form.Label>نسبة الخصم المراد خصمها مع كل عملية</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل نسبة الخصم"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
              <Form.Text className="text-muted">
                أدخل نسبة الخصم كنسبة مئوية (0-100).
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            قبول
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to show mentor details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل المستشار</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mentorDetails ? (
            <>
              <img
                src={mentorDetails.image || "placeholder.jpg"}
                alt="Mentor"
                className="img-fluid mb-3"
                style={{ maxHeight: "300px" }}
              />
              <p>
                <strong>العنوان:</strong> {mentorDetails.address || "غير متوفر"}
              </p>
              <p>
                <strong>الوصف:</strong>{" "}
                {mentorDetails.description || "غير متوفر"}
              </p>
            </>
          ) : (
            <p>جاري التحميل...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Nonactivemonitor;
