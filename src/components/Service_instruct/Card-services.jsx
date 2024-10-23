import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CardServices.css'; // Custom CSS file

const CardServices = () => {
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

  // Service details
  const services = [
    {
      title: "برنامج الاستشارات المتخصصة",
      description: "نوفر استشارات من قبل مجموعة من الخبراء المتخصصين في القطاع الخيري، لتقديم نصائح مخصصة واستراتيجيات لمواجهة التحديات وتعظيم الأثر.",
      points: [
        "التخطيط الاستراتيجي.",
        "الامتثال والحوكمة.",
        "قياس وتقييم الأثر للمشاريع."
      ]
    },
    {
      title: "برنامج إدارة المؤسسات الخيرية",
      description: "نقدم إرشادات خبراء حول كيفية تأسيس وإدارة المؤسسات الخيرية لضمان عمليات فعالة وشفافة.",
      points: [
        "تأسيس المؤسسات الخيرية وإجراءات الاشهار.",
        "تطوير اللوائح والانظمة الداخلية للمؤسسة.",
        "تنظيم الهيكل الإداري.",
        "تطوير السياسات والإجراءات."
      ]
    },
    {
      title: "برنامج إدارة المشاريع الخيرية",
      description: "التخطيط العام لمشاريع المؤسسة وفقا لأهدافها الاستراتيجية.",
      points: [
        "التخطيط لإدارة المشاريع الخيرية وتحديد الأهداف.",
        "آليات إدارة المخاطر للمشاريع.",
        "إعداد تقارير المشاريع."
      ]
    },
    {
      title: "برنامج التسويق للمشاريع الخيرية",
      description: "نساعد في تطوير استراتيجيات تسويقية مبتكرة لتعزيز المشاريع الخيرية وزيادة الوعي والدعم.",
      points: [
        "صناعة البراند للمؤسسة.",
        "بناء هوية.",
        "تطوير استراتيجيات التسويق.",
        "إدارة الحملات الإعلامية والإعلانية.",
        "تحسين تواجد المؤسسات على وسائل التواصل الاجتماعي."
      ]
    },
    {
      title: "برنامج تنمية الموارد المالية",
      description: "نساعد في تحديد وتطوير الموارد اللازمة لدعم ونمو مشاريعك ومبادراتك الخيرية.",
      points: [
        "تصميم استراتيجيات جمع التبرعات.",
        "تصميم وتنفيذ حملات جمع التبرعات.",
        "إقامة شراكات مع الجهات المانحة والشركات.",
        "تطوير برامج العضوية والتبرعات المستدامة."
      ]
    },
    {
      title: "برامج تدريب وتطوير كوادر العمل الخيري",
      description: "ورش عمل تدريبية للعاملين في القطاع الخيري.",
      points: [
        "برامج تدريبية متخصصة لتنمية مهارات الإدارة والقيادة."
      ]
    },
    {
      title: "برنامج التحليل وإعداد التقارير",
      description: "إعداد تقارير دورية حول الأداء المالي والإداري.",
      points: [
        "تحليل البيانات لتحديد نقاط القوة والضعف.",
        "تقديم توصيات لتحسين الأداء وزيادة الأثر."
      ]
    },
    {
      title: "برنامج التواصل وبناء الشراكات",
      description: "بناء شبكات تواصل بين المؤسسات الخيرية.",
      points: [
        "تسهيل الشراكات بين المؤسسات والجهات المانحة.",
        "تنظيم فعاليات ومؤتمرات لتعزيز التعاون وتبادل الخبرات."
      ]
    },
    {
      title: "برنامج إدارة الجودة",
      description: "تقييم شامل لنظم إدارة الجودة الحالية.",
      points: [
        "تطوير نظم الجودة: تصميم وتنفيذ نظم مخصصة لضمان الجودة.",
        "التدريب والتأهيل: برامج تدريبية لتعزيز معايير الجودة.",
        "الرقابة والمراجعة: تدقيق دوري وإعداد تقارير الجودة.",
        "التحسين المستمر: تقديم توصيات لتحسين العمليات والإجراءات."
      ]
    }
  ];

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
        <h2 className="mb-4 title-serveses">
              <span style={{ color: '#07a79d' }}> خدماتنا </span>
            </h2>
        {/* Services Section */}
        <Row className="mb-4">
          {services.map((service, index) => (
            <Col lg={4} md={6} key={index}>
              <Card className="mb-4 service-card">
                <Card.Body>
                  <Card.Title className="service-title">{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <ul className="list-pointservice">
                    {service.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

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
                    <Card.Body className="card-instruction">
                      <Card.Title className="mb-0">{instruction.title}</Card.Title>
                      <Card.Text className="text-muted mb-2">{instruction.type} - {instruction.startDate}</Card.Text>
                      <Card.Text className="text-muted mb-2">
                        مالك الاستشارة: {instruction.owner?.name || 'غير معروف'}
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
                          style={{ backgroundColor: '#07a79d', border: 'none' }}
                          className="btn-service mr-"
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
              <p><strong>السعر : </strong> {selectedInstruction.price} دينار</p>
              <p><strong>الحالة : </strong> {selectedInstruction.isActive ? 'نشطة' : 'غير نشطة'}</p>
              {/* Add more details here if available */}
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

export default CardServices;
