import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Mentor.css";
import { ToastContainer, toast } from 'react-toastify';

const AllInstructions = () => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mentorId } = useParams(); // Use 'mentorId' from route parameters

  // Fetch instructions from the API
  const fetchInstructions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}tickets/mentor/${mentorId}`,
        { withCredentials: true }
      );
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setInstructions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching instructions:", error);
      setLoading(false);
    }
  };

  // Delete instruction
  const deleteInstruction = async (instructionId) => {
    try {
      console.log("Deleting instruction with ID:", instructionId);  // Log ID
      const response = await axios.delete(
        `${import.meta.env.VITE_MAIN_URL}tickets/${instructionId}`,
        { withCredentials: true }
      );
      if (response.status === 200 ) {
        toast.error("تم حذف الإستشارة بنجاح");
        setInstructions((prevInstructions) =>
          prevInstructions.filter(
            (instruction) => instruction._id !== instructionId
          )
        );
      } else {
        console.error(`Failed to delete. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting instruction:", error.response || error);
    }
  };
  
  

  useEffect(() => {
    fetchInstructions();
  }, [mentorId]);

  return (
    <Container>
      <h2 className="my-4">All Instructions</h2>
      {loading ? (
        <p>Loading instructions...</p>
      ) : (
        <Row>
          {instructions.length > 0 ? (
            instructions.map((instruction) => (
              <Col key={instruction._id} md={4} className="mb-4">
                <Card className="instruction-card shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-center">
                      {instruction.title}
                    </Card.Title>
                    <Card.Text>
                      <strong>Duration:</strong> {instruction.duration} minutes
                      <br />
                      <strong>Start Time:</strong>{" "}
                      {new Date(instruction.startDate).toLocaleString()}
                      <br />
                      <strong>Price:</strong> {instruction.price} EGP
                      <br />
                      <strong>Day:</strong>{" "}
                      {new Date(instruction.day).toLocaleDateString()}
                      <br />
                      <strong>Type:</strong> {instruction.type}
                      <br />
                      <strong>Status:</strong>{" "}
                      {instruction.isActive ? "Active" : "Inactive"}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-danger"
                        className="btn-custom-delete"
                        onClick={() => deleteInstruction(instruction._id)}
                      >
                        حذف
                      </Button>
                      <Button
                        variant="outline-success"
                        className="btn-custom-show-service"
                        onClick={() => viewServiceRequests(instruction._id)} // Define this function to handle viewing service requests
                      >
                        عرض طالبين الخدمة
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No instructions found for this mentor.</p>
          )}
        </Row>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />

    </Container>
  );
};

export default AllInstructions;
