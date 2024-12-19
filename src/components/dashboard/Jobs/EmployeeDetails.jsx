import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Core styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Default layout styles
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

  // Fetch employee data
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}employee/${id}`);
        setEmployee(response.data.document[1]);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('An error occurred while fetching employee details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}employee/${id}`);
      navigate('/jobs_founder');
      alert('تم حذف الموظف بنجاح');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('حدث خطأ أثناء حذف الموظف');
    }
  };

  const handleCall = (phone) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      alert('لا يوجد رقم هاتف متوفر للاتصال');
    }
  };

  const handleWhatsApp = (phone) => {
    if (phone) {
      window.open(`https://wa.me/${phone}`, '_blank');
    } else {
      alert('لا يوجد رقم هاتف متوفر لإرسال رسالة واتساب');
    }
  };

  const handleCVDownload = () => {
    const cvUrl = employee?.pdf || '';
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    } else {
      alert('لا توجد سيرة ذاتية متوفرة');
    }
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="warning">لا يوجد موظف بهذا المعرف</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>تفاصيل الموظف</h2>
      <Row>
        <Col md={6} className="text-center">
          {employee.image ? (
            <img
              src={employee.image}
              alt="Employee"
              style={{ width: '80%', borderRadius: '8px' }}
            />
          ) : (
            <p>لا توجد صورة متوفرة</p>
          )}
        </Col>
        <Col md={6}>
          <p><strong>الاسم:</strong> {employee.name || 'غير محدد'}</p>
          <p><strong>رقم الهاتف:</strong> {employee.phone || 'غير متوفر'}</p>
          <p><strong>العنوان:</strong> {employee.address || 'غير محدد'}</p>
          <p><strong>العمر:</strong> {employee.age || 'غير متوفر'}</p>

          {/* Action Buttons */}
          <Button variant="danger" onClick={openDeleteModal} className="me-2">حذف الموظف</Button>
          <Button variant="secondary" onClick={openContactModal} className="me-2">التواصل مع الموظف</Button>
          <Button variant="info" onClick={handleCVDownload}>عرض / تحميل السيرة الذاتية</Button>
        </Col>
      </Row>

      {/* PDF Viewer */}
      <div className="pdf-viewer mt-5">
        <h2 className="text-center">السيرة الذاتية</h2>
        {employee.pdf ? (
        <Worker workerUrl={pdfWorkerUrl}>
        <Viewer
          fileUrl={employee.pdf}
          renderError={() => <p className="text-center text-danger">فشل تحميل السيرة الذاتية. الرجاء المحاولة لاحقًا.</p>}
        />
      </Worker>      
        ) : (
          <p className="text-center">لا توجد نسخة من السيرة الذاتية.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد حذف الموظف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد أنك تريد حذف هذا الموظف؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>إغلاق</Button>
          <Button variant="danger" onClick={handleDelete}>حذف</Button>
        </Modal.Footer>
      </Modal>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={closeContactModal}>
        <Modal.Header closeButton>
          <Modal.Title>خيارات التواصل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>اختر طريقة التواصل مع الموظف:</p>
          <Button variant="success" className="me-2" onClick={() => handleCall(employee.phone)}>
            اتصال هاتفي
          </Button>
          <Button variant="primary" onClick={() => handleWhatsApp(employee.phone)}>
            رسالة واتساب
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeContactModal}>إغلاق</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeDetails;
