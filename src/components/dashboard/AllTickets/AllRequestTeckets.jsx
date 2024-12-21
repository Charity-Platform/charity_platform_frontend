import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllRequestTickets = () => {
  const [tickets, setTickets] = useState([]); // بيانات التذاكر
  const [fields, setFields] = useState([]); // المجالات المتاحة
  const [selectedField, setSelectedField] = useState(''); // تصفية بناءً على المجال المحدد
  const [filterText, setFilterText] = useState(''); // تصفية نصية
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ
  const [selectedTicket, setSelectedTicket] = useState(null); // للتفاصيل المختارة
  const [showDetails, setShowDetails] = useState(false); // لتفعيل المودال
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // لتفعيل المودال تأكيد الحذف
  const [ticketToDelete, setTicketToDelete] = useState(null); // لتحديد التذكرة للحذف

  // جلب المجالات المتاحة للتصفية
  const fetchFields = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`);
      if (response.data && Array.isArray(response.data.document)) {
        setFields(response.data.document);
      } else {
        setFields([]);
        setError('لا توجد مجالات متاحة.');
      }
    } catch (err) {
      setError('فشل في تحميل المجالات.');
    }
  };

  // جلب التذاكر بناءً على المجال المحدد
  const fetchTickets = async (field) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}tickets/field`, {
        params: field ? { field } : {}, // إضافة المجال كمعامل استعلام إذا وُجد
      });
      if (response.data && Array.isArray(response.data.data)) {
        setTickets(response.data.data);
      } else {
        setTickets([]);
        setError('لم يتم العثور على تذاكر.');
      }
    } catch (err) {
      setError('فشل في تحميل التذاكر.');
    } finally {
      setLoading(false);
    }
  };

  // جلب المجالات عند التحميل الأول
  useEffect(() => {
    fetchFields();
  }, []);

  // جلب التذاكر كلما تغير المجال المحدد
  useEffect(() => {
    fetchTickets(selectedField);
  }, [selectedField]);

  // تصفية التذاكر بناءً على النص المُدخل
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(filterText.toLowerCase())
  );

  // حذف التذكرة
  // حذف التذكرة
const handleDeleteTicket = async (ticketId, ticketOwnerId) => {
  // const userId = localStorage.getItem('userId'); // استرجاع معرف المستخدم المسجل الدخول

  // // التأكد من أن المستخدم الذي قام بتسجيل الدخول هو المالك للتذكرة
  // if (ticketOwnerId !== userId) {
  //   toast.error('لا يمكنك حذف هذه التذكرة لأنها ليست ملكك.');
  //   return;
  // }

  try {
    // إرسال طلب الحذف باستخدام توكن التوثيق
    const response = await axios.delete(
      `${import.meta.env.VITE_MAIN_URL}tickets/${ticketId}`,
       {withCredentials:true},
   
    );

    if (response.status === 200) {
      // إذا كانت الاستجابة ناجحة، إزالة التذكرة المحذوفة من الحالة
      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
      toast.success('تم حذف التذكرة بنجاح!');
    } else {
      toast.error('فشل في حذف التذكرة.');
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // في حالة وجود خطأ 403 (محظور) من الخادم
      toast.error('لا تمتلك صلاحيات لحذف هذه التذكرة.');
    } else {
      toast.error('حدث خطأ أثناء حذف التذكرة.');
    }
    console.error(error.message);
  }
};

  

  return (
    <Container className="py-5" dir='rtl'>
      <h2 className="text-center mb-4">جميع الاستشارات النشطة داخل المنصة</h2>
      {/* عرض رسائل الخطأ */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* مؤشر التحميل */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* الفلاتر */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="fieldFilter">
            <Form.Label>تصفية حسب المجال</Form.Label>
            <Form.Select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="">كل المجالات</option>
              {fields.map((field) => (
                <option key={field._id} value={field.name}>
                  {field.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="textFilter">
            <Form.Label>البحث حسب العنوان</Form.Label>
            <Form.Control
              type="text"
              placeholder="ابحث عن التذاكر..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* عرض التذاكر */}
      <Row >
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Col md={4} lg={3} key={ticket._id} className="mb-4">
              <Card className="h-100" >
                <Card.Body  >
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Text  >
                    <strong>المدة:</strong> {ticket.duration} دقيقة
                    <br />
                    <strong>وقت البدء:</strong> {ticket.startDate}
                    <br />
                    <strong>السعر:</strong> ${ticket.price}
                    <br />
                    <strong>النوع:</strong> {ticket.type}
                    <br />
                    <strong>نشط:</strong> {ticket.isActive ? 'نعم' : 'لا'}
                    <br />
                    <strong>المالك:</strong> {ticket.owner?.name || 'غير معروف'}
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowDetails(true);
                    }}
                  >
                    عرض التفاصيل
                  </Button>
                  <Button 
                    variant="danger" 
                    className="mt-2" 
                    onClick={() => {
                      setTicketToDelete(ticket);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    حذف
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">لا توجد تذاكر متاحة.</p>
          </Col>
        )}
      </Row>

      {/* Toast Notification */}
      <ToastContainer />

      {/* Modal عرض التفاصيل */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل التذكرة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTicket && (
            <div>
              <p><strong>عنوان:</strong> {selectedTicket.title}</p>
              <p><strong>المدة:</strong> {selectedTicket.duration} دقيقة</p>
              <p><strong>وقت البدء:</strong> {selectedTicket.startDate}</p>
              <p><strong>السعر:</strong> ${selectedTicket.price}</p>
              <p><strong>النوع:</strong> {selectedTicket.type}</p>
              <p><strong>المالك:</strong> {selectedTicket.owner?.name || 'غير معروف'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal تأكيد الحذف */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد أنك تريد حذف هذه التذكرة؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            إلغاء
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDeleteTicket(ticketToDelete._id)}
          >
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllRequestTickets;
