import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DashBoard.css';

const AllUser = () => {
  const [users, setUsers] = useState([]); // State to store users data
  const [loading, setLoading] = useState(false); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}users`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response.data); // Log response to check structure
        setUsers(Array.isArray(response.data.document) ? response.data.document : []); // Ensure users is an array
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  // Update role to admin
// Function to update the user's role to admin
// Function to update the user's role to admin
const handleUpdateRole = async (user) => {
  if (!user || !user._id) {
    alert('User information is missing.');
    return;
  }

  try {
    // Correctly format the URL based on backend expectations
    const response = await axios.patch(
      `${import.meta.env.VITE_MAIN_URL}users/update-role/${user._id}`, // Corrected route as per your backend
      { role: 'admin' }, // Role is passed in the request body as JSON
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Send credentials with the request
      }
    );

    if (response.status === 200) {
      alert('Role updated to admin successfully!');
      // Update the user state to reflect the change
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, role: 'admin' } : u
        )
      );
    } else {
      alert('Failed to update role. Please try again.');
    }
  } catch (error) {
    console.error(
      'Error updating role:',
      error.response ? error.response.data : error.message
    );
    alert(`Failed to update role. ${error.response?.data?.message || 'Please try again.'}`);
  }
};


  

  return (
    <Container fluid dir="rtl">
      <Row className="mb-4">
        <h1 className="text-center">كل المستخدمين</h1>
        <Col md={3} className="d-flex justify-content-between align-items-center" dir="rtl">
          <Link to="/dashboard">
            <Button variant="primary">الصفحة الرئيسية</Button>
          </Link>
          <Link to="/">
            <Button variant="primary">عرض الموقع</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="main-card">
            <Card.Header className="card-header">قائمة المستخدمين</Card.Header>
            <Card.Body>
              {loading ? (
                <p>جاري التحميل...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <Table striped bordered hover responsive className="user-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>الاسم</th>
                      <th>البريد الإلكتروني</th>
                      <th>الهاتف</th>
                      <th>الدور</th>
                      <th>تحديث الدور</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td> {/* Counter for each user */}
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone || 'غير متوفر'}</td> {/* Show phone number or a fallback */}
                          <td style={{ color: user.role === 'admin' ? 'green' : 'black' }}>
                            {user.role}
                          </td>
                          <td>
                            <Button
                              variant={user.role === 'admin' ? 'success' : 'primary'}
                              onClick={() => handleUpdateRole(user)}
                              disabled={user.role === 'admin'}
                            >
                              {user.role === 'admin' ? 'أدمن' : 'ترقية إلى أدمن'}
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No users available.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AllUser;
