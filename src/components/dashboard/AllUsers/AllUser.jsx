import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../DashBoard.css';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}users`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response.data);
        setUsers(Array.isArray(response.data.document) ? response.data.document : []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = async (user) => {
    if (!user || !user._id) {
      toast.error('User information is missing.');
      return;
    }
  
    const newRole = user.role === 'admin' ? 'user' : 'admin'; // Determine the new role
    const previousUsers = [...users];
  
    // Optimistic UI Update
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === user._id ? { ...u, role: newRole } : u))
    );
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MAIN_URL}users/update-role/${user._id}`,
        { role: newRole }, // Set the new role
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      // console.log(response.status)
  
      if (response.status === 200 || response.status === 201) {
        toast.success(
          `${user.name} role has been updated to ${newRole === 'admin' ? 'Admin' : 'User'}.`
        );
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error updating role:', error.response?.data || error.message);
      toast.error(`Failed to update role. ${error.response?.data?.message || 'Please try again.'}`);
      // Revert UI changes if the update fails
      setUsers(previousUsers);
    }
  };
  

  return (
    <Container fluid dir="rtl">
      <Row className="mb-4">
        <h1 className="text-center">كل المستخدمين</h1>
        <Col
          md={3}
          className="d-flex justify-content-between align-items-center"
          dir="rtl"
        >
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
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone || "غير متوفر"}</td>
                          <td
                            style={{
                              color: user.role === "admin" ? "green" : "black",
                            }}
                          >
                            {user.role}
                          </td>
                          <td>
                            <Button
                              variant="outline-danger" // Red border with transparent background for admins
                              style={
                                user.role === "admin"
                                  ? { color: "white", backgroundColor: "red" }
                                  : { color: "white", backgroundColor: "green" }
                              } // Styling dynamically
                              onClick={() => handleUpdateRole(user)}
                            >
                              {user.role === "admin"
                                ? "إرجاع كـ مستخدم"
                                : "ترقية إلى أدمن"}
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

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default AllUser;