import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CardServices.css'; // Custom CSS file

const Card_services = () => {
  const [show, setShow] = useState(false);
  const [fields, setFields] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [loadingInstructions, setLoadingInstructions] = useState(false);
  const [selectedInstruction, setSelectedInstruction] = useState(null);

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
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`);
        setFields(response.data.document || []);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };

    fetchFields();
  }, []);

  // Fetch all instructions or filtered instructions
  const fetchInstructions = async (fieldName = '') => {
    setLoadingInstructions(true);
    try {
      const endpoint = fieldName
        ? `${import.meta.env.VITE_MAIN_URL}tickets/${fieldName}`
        : `${import.meta.env.VITE_MAIN_URL}tickets/field`; // Fetch all instructions if no field is selected
      const response = await axios.get(endpoint);
      setInstructions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching instructions:", error);
      setInstructions([]); // Clear instructions on error
    } finally {
      setLoadingInstructions(false);
    }
  };

  // Handle filter change
  const handleFieldChange = (event) => {
    const fieldName = event.target.value;
    setSelectedField(fieldName);
    setInstructions([]); // Clear previous instructions
    fetchInstructions(fieldName); // Fetch instructions for the selected field or all
  };

  // Fetch all instructions when the component mounts
  useEffect(() => {
    fetchInstructions();
  }, []);

  return (
    <div className='card-total' dir='rtl'>
      <Container>
        
        {/* Main Intro Section */}
        <Card className="mb-4 welcome-card">
          <Card.Body className="text-center p-4">
            <h2 className="mb-4">
              أهلا بك في <span style={{ color: '#07a79d' }}>المرشد الخيري</span>
            </h2>
            <p className="lead">
              نقدم خدمات استشارية متخصصة لمساعدة مؤسستك الخيرية والأهلية على تجاوز تحديات القطاع غير الربحي.
              فريقنا من الخبراء ملتزم بتقديم نصائح وحلول مخصصة تتناسب مع احتياجاتك وتحديات مؤسستك.
            </p>
          </Card.Body>
        </Card>

        {/* Consulting Fields Section */}
        <Card className="mb-4 consulting-fields">
          <Card.Body className="p-4">
            <h5 className="mb-4" style={{ color: '#07a79d', fontWeight: 'bold' }}>مجالات الاستشارات:</h5>
            <Row>
              <Col lg={4}>
                <ul className="custom-list">
                  <li>تأسيس وإشهار المؤسسات الخيرية</li>
                  <li>الإدارة العامة للمؤسسة الخيرية والأهلية</li>
                  <li>إدارة المشاريع الخيرية</li>
                  <li>إدارة المشاريع الخيرية (التعليمية)</li>
                  <li>التخطيط الاستراتيجي</li>
                </ul>
              </Col>
              <Col lg={4}>
                <ul className="custom-list">
                  <li>إدارة العمليات</li>
                  <li>إدارة الجودة وتحسين الأداء</li>
                  <li>الامتثال والحوكمة</li>
                  <li>إدارة المخاطر</li>
                  <li>التسويق للمشاريع الخيرية</li>
                </ul>
              </Col>
              <Col lg={4}>
                <ul className="custom-list">
                  <li>تنمية الموارد المالية</li>
                  <li>التدريب والتطوير</li>
                  <li>التحليل وإعداد التقارير</li>
                  <li>العلاقات العامة والتواصل وبناء الشراكات</li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Filter Dropdown */}
        <Form.Group controlId="fieldSelect" className="mb-3 filter-dropdown">
          <Form.Label>اختر مجالًا لتصفية الاستشارات</Form.Label>
          <Form.Control as="select" value={selectedField} onChange={handleFieldChange}>
            <option value="">عرض جميع المجالات</option> {/* Default option */}
            {fields.map(field => (
              <option key={field._id} value={field.name}>{field.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Displaying the instruction cards */}
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {loadingInstructions ? (
            <p>جاري تحميل الاستشارات...</p>
          ) : (
            instructions.length > 0 ? (
              instructions.map((instruction) => (
                <Col key={instruction._id}>
                  <Card className='card-service' style={{ transition: '0.3s', borderRadius: '8px', overflow: 'hidden' }}>
                    <Card.Body>
                      <Card.Title className="mb-0">{instruction.title}</Card.Title>
                      <Card.Text className="text-muted mb-2">{instruction.type} - {instruction.startDate}</Card.Text>
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
                          style={{ backgroundColor: '#07a79d', border: 'none' }}
                          className="btn-service"
                        >
                          طلب إستشارة
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>لا توجد استشارات متاحة لهذا المجال.</p>
            )
          )}
        </Row>

        {/* Modal for instruction details */}
        {selectedInstruction && (
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedInstruction.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body dir="rtl">
              <p><strong>نوع الاستشارة : </strong> {selectedInstruction.type}</p>
              <p><strong>التاريخ : </strong> {new Date(selectedInstruction.day).toLocaleDateString()}</p>
              <p><strong>الوقت : </strong> {selectedInstruction.startDate}</p>
              <p><strong>المدة : </strong> {selectedInstruction.duration} دقيقة</p>
              <p><strong>السعر : </strong> {selectedInstruction.price} ريال</p>
              <p><strong>الحالة : </strong> {selectedInstruction.isActive ? 'نشطة' : 'غير نشطة'}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إغلاق
              </Button>
              <Button
                variant="primary"
                onClick={handleClose}
                style={{ backgroundColor: '#07a79d', border: 'none' }}
              >
                طلب الإستشارة
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default Card_services;
