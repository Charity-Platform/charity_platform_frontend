import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Toast, ToastContainer } from "react-bootstrap";

const AllRequestTekit = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}tickets/request/my-requests`,
        { withCredentials: true }
      );
      setRequests(response.data.data); // Extract data array
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete request by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_MAIN_URL}tickets/request/${id}`,
        { withCredentials: true }
      );
      setRequests(requests.filter((request) => request._id !== id));
      setToastMessage("تم حذف الطلب بنجاح");
      setShowToast(true);
    } catch (err) {
      setToastMessage("خطأ أثناء حذف الطلب: " + err.message);
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div>جارٍ التحميل...</div>;
  }

  if (error) {
    return <div>خطأ: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">كل الطلبات</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المستخدم</th>
            <th>البريد الإلكتروني</th>
            <th>رقم الهاتف</th>
            <th>تاريخ الدفع</th>
            <th>عنوان التذكرة</th>
            <th>السعر</th>  
            <th>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.user?.name || "غير متوفر"}</td>
              <td>{request.user?.email || "غير متوفر"}</td>
              <td>{request.user?.phone || "غير متوفر"}</td>
              <td>{new Date(request.paidOn).toLocaleDateString()}</td>
              <td>{request.ticket?.title || "غير متوفر"}</td>
              <td>{request.ticket?.price || "غير متوفر"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(request._id)}
                  className="m-2 w-100 w-sm-auto"
                  style={{backgroundColor: 'red'}}
                >
                  حذف
                </Button>
                <Button
                  variant="success"
                  href={`https://wa.me/${request.user?.phone}`}
                  target="_blank"
                  className="m-2 w-100 w-sm-auto"
                >
                  إرسال رسالة واتساب
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="danger"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AllRequestTekit;
