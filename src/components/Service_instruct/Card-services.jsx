import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./CardServices.css"; // Custom CSS file
import CardInfo from "./Card";
import { useNavigate } from "react-router-dom"; // Correct hook

const CardServices = () => {
  const [show, setShow] = useState(false);
  const [fields, setFields] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [loadingInstructions, setLoadingInstructions] = useState(false);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setSelectedInstruction(null);
  };

  const handleShow = (instruction) => {
    setSelectedInstruction(instruction);
    setShow(true);
  };

  // Fetch fields from API
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}fields`
        );
        setFields(response.data.document || []);
      } catch (error) {
        setError("حدث خطأ في تحميل المجالات.");
        console.error("Error fetching fields:", error);
      }
    };

    fetchFields();
    window.scrollTo(0, 0);
  }, []);

  // Fetch instructions based on field using the updated API
  const fetchInstructions = async (fieldName = "") => {
    setLoadingInstructions(true);
    setError(null); // Reset error state on every new request
    try {
      const endpoint = fieldName
        ? `${import.meta.env.VITE_MAIN_URL}tickets/field?field=${fieldName}`
        : `${import.meta.env.VITE_MAIN_URL}tickets/field`;
      const response = await axios.get(endpoint);
      setInstructions(response.data.data || []);
    } catch (error) {
      setInstructions([]);
      setError("حدث خطأ في تحميل الاستشارات.");
      console.error("Error fetching instructions:", error);
    } finally {
      setLoadingInstructions(false);
    }
  };

  // Handle field selection change
  const handleFieldChange = (event) => {
    const fieldName = event.target.value;
    setSelectedField(fieldName);
    setInstructions([]); // Clear previous instructions
    fetchInstructions(fieldName); // Fetch instructions for the selected field
  };

  useEffect(() => {
    fetchInstructions();
  }, []);

  return (
    <div className="card-total" dir="rtl">
      <Container>
        {/* Main Intro Section */}
        <Card className="mb-4 welcome-card">
          <Card.Body className="text-center p-4">
            <h2 className="mb-4">
              أهلا بك في <span style={{ color: "#07a79d" }}>المرشد الخيري</span>
            </h2>
            <p className="lead">
              خدمات استشارية متخصصة لمساعدة مؤسستك على تجاوز تحديات القطاع غير
              الربحي. فريقنا من الخبراء ملتزم بتقديم نصائح وحلول مخصصة تتناسب مع
              احتياجاتك وتحديات مؤسستك.
            </p>
          </Card.Body>
        </Card>

        <h2 className="mb-4 title-serveses">
          <span style={{ color: "#07a79d" }}> خدماتنا </span>
        </h2>

        {/* Services Section */}
        <CardInfo />

        {/* Field Filter */}
        <Form.Group controlId="fieldSelect" className="mb-3 filter-dropdown">
          <Form.Label>اختر مجالًا لتصفية الاستشارات</Form.Label>
          <Form.Control
            as="select"
            value={selectedField}
            onChange={handleFieldChange}
            className="fillter-option"
          >
            <option value="">عرض جميع المجالات</option> {/* Default option */}
            {fields.map((field) => (
              <option key={field._id} value={field.name}>
                {field.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}

        {/* Displaying the instruction cards */}
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {loadingInstructions ? (
            <p>جاري تحميل الاستشارات...</p>
          ) : instructions.length > 0 ? (
            instructions.map((instruction) => (
              <Col key={instruction._id}>
                <Card
                  className="card-service"
                  style={{
                    transition: "0.3s",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Card.Body className="card-instruction">
                    <Card.Title className="mb-0">
                      {instruction.title}
                    </Card.Title>
                    <Card.Text className="text-muted mb-2">
                      <strong>نوع الاستشارة : </strong>
                      {instruction.type === "online"
                        ? "عبر الإنترنت"
                        : "في الموقع"}
                    </Card.Text>

                    <Card.Text className="text-muted mb-2">
                    <strong> مالك الاستشارة :  </strong>
                      {instruction.owner?.name || "غير معروف"}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleShow(instruction)}
                        className="me-2 custom-button"
                      >
                        تفاصيل
                      </Button>
                      <Button
                        variant="primary"
                        style={{ backgroundColor: "#07a79d", border: "none" }}
                        className="btn-service"
                        onClick={() =>
                          navigate(`/ServicesPayment/${instruction._id}`)
                        }
                      >
                        طلب استشارة
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>لا يوجد استشارات في هذا المجال حاليا.</p>
          )}
        </Row>

        {/* Modal for instruction details */}
        {selectedInstruction && (
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedInstruction.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body dir="rtl">
              <p>
                <strong>نوع الاستشارة : </strong>
                {selectedInstruction.type === "online"
                  ? "عبر الإنترنت"
                  : "في الموقع"}
              </p>

              {/* <p><strong>التاريخ : </strong> {new Date(selectedInstruction.day).toLocaleDateString()}</p> */}
              {/* <p><strong>الوقت : </strong> {selectedInstruction.startDate}</p> */}
              <p>
                <strong>المدة : </strong> {selectedInstruction.duration} دقيقة
              </p>
              <p>
                <strong>السعر : </strong> {selectedInstruction.price} دينار
              </p>
              <p>
                <strong>توافر الاستشارة : </strong>{" "}
                {selectedInstruction.isActive
                  ? "متوفرة حاليا"
                  : "غير متوفرة حاليا"}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إغلاق
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  navigate(`/ServicesPayment/${selectedInstruction._id}`)
                }
              >
                طلب استشارة
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default CardServices;
