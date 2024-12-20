import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner, Badge } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrashAlt, FaEye } from "react-icons/fa";

const AllInstructions = () => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mentorId } = useParams();
  const Navigate = useNavigate();

  const fetchInstructions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}tickets/my-tickets`,
        { withCredentials: true }
      );
      
      // Here, we'll extract the data array from the API response
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      
      // Now we set the instructions data
      setInstructions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching instructions:", error);
      setLoading(false);
    }
  };

  const deleteInstruction = async (instructionId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_MAIN_URL}tickets/${instructionId}`,
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        toast.error("تم حذف الإستشارة بنجاح");
        
        setInstructions((prevInstructions) =>
          prevInstructions.filter(
            (instruction) => instruction._id !== instructionId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting instruction:", error.response || error);
    }
  };

  const viewServiceRequests = (instructionId) => {
    console.log("Viewing service requests for instruction ID:", instructionId);
  };

  useEffect(() => {
    fetchInstructions();
  }, [mentorId]);

  return (
    <Container className="my-4" dir="rtl">
      <Button onClick={() => Navigate('/allRequestTekit')}>كل الاستشارات الواردة</Button>
      <h2 className="text-center text-primary mb-4">كل الإستشارات المتاحة في المنصة حاليا</h2>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary" />
          <p className="mt-3">جاري تحميل الإستشارات...</p>
        </div>
      ) : (
        <Row>
          {instructions.length > 0 ? (
            instructions.map((instruction) => (
              <Col key={instruction._id} md={6} lg={6} className="mb-4">
                <Card border={instruction.isActive ? "success" : "danger"} className="h-100">
                  <Card.Header className="text-center bg-light" style={{ color: '#000' }}>
                    <h5>{instruction.title}</h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <strong>المدة:</strong> {instruction.duration} دقائق
                      <br />
                      <strong>وقت البدء:</strong> {new Date(instruction.startDate).toLocaleString()}
                      <br />
                      <strong>السعر:</strong> {instruction.price} دك
                      <br />
                      <strong>اليوم:</strong> {new Date(instruction.day).toLocaleDateString()}
                      <br />
                      <strong>النوع:</strong> {instruction.type}
                      <br />
                      <strong>الحالة:</strong> 
                      <Badge bg={instruction.isActive ? "success" : "danger"}>
                        {instruction.isActive ? "نشطة" : "غير نشطة"}
                      </Badge>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button
                      variant="danger"
                      style={{ backgroundColor: 'red' }}
                      onClick={() => deleteInstruction(instruction._id)}
                    >
                      <FaTrashAlt className="me-2" /> حذف
                    </Button>
                    {/* Optionally, you can add a view button like this */}
                    {/* <Button
                      variant="primary"
                      onClick={() => viewServiceRequests(instruction._id)}
                    >
                      <FaEye className="me-2" /> عرض طلب الخدمة
                    </Button> */}
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">لا توجد إستشارات لهذا المعلم.</p>
          )}
        </Row>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
    </Container>
  );
};

export default AllInstructions;
