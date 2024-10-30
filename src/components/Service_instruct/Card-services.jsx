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
      title: "تأسيس وبناء الجمعيات الخيرية ",
      // description: "نوفر استشارات من قبل مجموعة من الخبراء المتخصصين في القطاع الخيري، لتقديم نصائح مخصصة واستراتيجيات لمواجهة التحديات وتعظيم الأثر.",
      points: [
        "	إعداد دراسة جدوى المؤسسة وتحليل احتياجات المجتمع لها",
        "	إعداد المستندات وتسهيل الاجراءات القانونية المطلوبة للتأسيس والاشهار",
        "	تحديد أهداف ورؤية ورسالة المؤسسة.",
        "تصميم هيكل تنظيمي فعال يتناسب مع طبيعة المؤسسة",
        "	إعداد السياسات واللوائح الداخلية للمؤسسة"
      ]
    },
    {
      title: "إدارة المشاريع الخيرية",
      // description: "نقدم إرشادات خبراء حول كيفية تأسيس وإدارة المؤسسات الخيرية لضمان عمليات فعالة وشفافة.",
      points: [
        "إدارة المشاريع الخيرية",
        "إعداد خطة المشاريع السنوية للمؤسسة وفقاً لأهدافها وخطتها الاستراتيجية",
        "دعم المؤسسة في تبني أفضل الممارسات في إدارة لمشاريعها الخيرية.",
        
      ]
    },
    {
      title: "التخطيط الاستراتيجي",
      // description: "التخطيط العام لمشاريع المؤسسة وفقا لأهدافها الاستراتيجية.",
      points: [
        "بناء وتطوير الرؤية والرسالة للمؤسسة",
        "	تحديد الأهداف الاستراتيجية طويلة وقصيرة الأجل",
        "وضع الخطة (الاستراتيجية - التشغيلية - التنفيذية) للمؤسسة"
      ]
    },
    {
      title: "التخطيط المالي والميزانيات",
      // description: "نساعد في تطوير استراتيجيات تسويقية مبتكرة لتعزيز المشاريع الخيرية وزيادة الوعي والدعم.",
      points: [
        "التخطيط المالي والميزانية",
        "تخصيص الموارد المالية لتحقيق الأهداف",
        "إعداد ميزانيات تفصيلية تتماشى مع الخطة الاستراتيجية",
      ]
    },
    {
      title: "إدارة الجودة وتحسين الأداء",
      // description: "نساعد في تحديد وتطوير الموارد اللازمة لدعم ونمو مشاريعك ومبادراتك الخيرية.",
      points: [
        "تقييم شامل لنظم إدارة الجودة الحالية ",
        "تطوير وتحسين نظم إدارة الجودة وتقييم الأداء للمؤسسة ",
        "الرقابة والمراجعة والتدقيق الدوري وإعداد تقارير الجودة",
        "توصيات لتحسين كفاءة العمليات الإدارية والتشغيلية ",
        "تطوير نظم إدارة الموارد البشرية "
      ]
    },
    {
      title: "الامتثال والحوكمة وإدارة المخاطر",
      // description: "ورش عمل تدريبية للعاملين في القطاع الخيري.",
      points: [
        "وضع معايير الشفافية والمساءلة لضمان النزاهة ",
        "توجيه المؤسسة حول أفضل الممارسات في الحوكمة والشفافية ",
        "تطوير سياسات وإجراءات الحوكمة للمؤسسة ",
        "تحديد المخاطر وتصميم استراتيجيات للحد منها "
      ]
    },
    {
      title: "تحديد المخاطر وتصميم استراتيجيات للحد منها ",
      // description: "إعداد تقارير دورية حول الأداء المالي والإداري.",
      points: [
        "خلق وبناء علامة تجارية للمؤسسة الخيرية ونشر الوعي حول خدماتها",
        "تصميم استراتيجيات تسويق الرقمي لزيادة التفاعل والدعم",
        "تحسين تواجد المؤسسة على وسائل التواصل الاجتماعي",
        "تصميم حملات تسويقية لجذب التبرعات"
      ]
    },
    {
      title: "	تنمية الموارد المالية" ,
      // description: "بناء شبكات تواصل بين المؤسسات الخيرية.",
      points: [
        "تطوير استراتيجيات لجذب التمويل والتبرعات",
        "تطوير برامج لبناء شراكات مع المانحين"
      ]
    },
    {
      title: "التدريب والتطوير",
      // description: "تقييم شامل لنظم إدارة الجودة الحالية.",
      points: [
        "تقدير الاحتياج للمؤسسة من البرامج التدريبية",
        "	تصميم خطة تدريبية لموظفي المؤسسة حسب الحاجة",
        "	توفير أفضل البرامج التدريبية لتنمية مهارات العاملين في المؤسسة الخيرية",
      ]
    },
    {
      title: "	العلاقات العامة والتواصل وبناء الشراكات",
      // description: "تقييم شامل لنظم إدارة الجودة الحالية.",
      points: [
        "تطوير خطط إعلامية لتعزيز حضور المؤسسة إعلامياً ",
        "	تصميم استراتيجية بناء سمعة إيجابية وإدارة الأزمات الإعلامية ",
        "	تطوير محتوى اعلامي إبداعي وجذاب يعكس رؤية المؤسسة وأهدافها ",
        "	تطوير استراتيجيات للتفاعل مع الجمهور المستهدف وتعزيز العلاقة معه",
        " تطوير استراتيجيات للتواصل الفعّال مع الجهات الداعمة والشركاء "
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
            خدمات استشارية متخصصة لمساعدة مؤسستك على تجاوز تحديات القطاع غير الربحي. فريقنا من الخبراء ملتزم بتقديم نصائح وحلول مخصصة تتناسب مع احتياجاتك وتحديات مؤسستك.
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
                  {/* <Card.Text>{service.description}</Card.Text> */}
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
                          طلب استشارة
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
