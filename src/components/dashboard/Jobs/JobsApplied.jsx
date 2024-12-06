import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';

const JobsApplied = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Fetch the employees' data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}employee`);
        setEmployees(response.data.document);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Function to handle showing the details modal
  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  // Function to handle deleting an employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}employee/${id}`);
      // Remove the deleted employee from the state
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
      alert('تم حذف الموظف بنجاح');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('حدث خطأ أثناء حذف الموظف');
    }
  };

  return (
    <div className="jobs-applied-container">
      <h2 className="text-center mb-4">جميع الموظفين المتقدمين</h2>
      <Row>
        {employees.map((employee) => (
          <Col key={employee._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={employee.image} />
              <Card.Body>
                <Card.Title>القسم: {employee.department || 'غير محدد'}</Card.Title>
                <Button variant="primary" onClick={() => handleShowDetails(employee)}>
                  عرض التفاصيل
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDeleteEmployee(employee._id)} 
                  className="ml-2">
                  حذف
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for showing employee details */}
      {selectedEmployee && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل الموظف</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>القسم:</h5>
            <p>{selectedEmployee.department || 'غير محدد'}</p>
            <h5>الصورة:</h5>
            <img
              src={selectedEmployee.image}
              alt="Employee"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h5>المعرف:</h5>
            <p>{selectedEmployee._id}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default JobsApplied;
