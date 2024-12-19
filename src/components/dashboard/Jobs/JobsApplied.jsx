import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const JobsApplied = () => {
  const [employees, setEmployees] = useState([]);
const Navigate = useNavigate();

  useEffect(() => {
    // Fetch the employees' data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}employee`);
        // Ensure that the response data is an array before updating the state
        setEmployees(Array.isArray(response.data.document) ? response.data.document : []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="jobs-applied-container" dir='rtl'>
      <Button className='m-3' onClick={()=>Navigate("/")}>الصفحة الرئيسية </Button>
      <h2 className="text-center m-5">جميع الموظفين المتقدمين</h2>
      {employees.length === 0 ? (
        <p className="text-center">لا يوجد موظفون بعد</p> // No employees message
      ) : (
        <Row>
          {employees.map((employee) => (
            <Col key={employee._id} md={2} className="m-4">
              <Card>
                <Card.Img variant="top" src={employee.image} className='m-2'/>
                <Card.Body>
                  <Link to={`/dashboard/employee-details/${employee._id}`}>
                    <Button variant="primary">عرض التفاصيل</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
    </div>
  );
};

export default JobsApplied;
