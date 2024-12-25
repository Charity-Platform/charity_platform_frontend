
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, Container, Spinner, Form, Button, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

const AcceptSalary = () => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mentors, setMentors] = useState({});
  const [mentorTotal, setMentorTotal] = useState({});
  const [totalEquity, setTotalEquity] = useState(0);
  const [filter, setFilter] = useState("all"); // Default filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const reportRef = useRef(); // For printing

  useEffect(() => {
    const fetchAcceptedUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}mentors/accepted-deposites`,
          { withCredentials: true }
        );
        const data = response.data.data;

        const mentorPromises = data.map(async (user) => {
          if (user.mentor) {
            const mentorInfo = await fetchMentorDetails(user.mentor);
            return { [user.mentor]: mentorInfo };
          }
          return {};
        });

        const mentorDetailsResults = await Promise.all(mentorPromises);
        const updatedMentorDetails = Object.assign({}, ...mentorDetailsResults);

        const totalEquityForMentors = data.reduce((acc, user) => {
          if (user.mentor) {
            acc[user.mentor] = (acc[user.mentor] || 0) + user.equity;
          }
          return acc;
        }, {});

        const totalEquityValue = data.reduce((sum, user) => sum + user.equity, 0);

        setMentors(updatedMentorDetails);
        setMentorTotal(totalEquityForMentors);
        setTotalEquity(totalEquityValue);
        setAcceptedUsers(data);
        setFilteredUsers(data); // Default filtered data is all users
      } catch (error) {
        setError("البيانات غير صحيحة");
        toast.error("البيانات غير صحيحة");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedUsers();
  }, []);

  const fetchMentorDetails = async (mentorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}mentors/${mentorId}`,
        { withCredentials: true }
      );
      const { name } = response.data.data;
      return { name };
    } catch (error) {
      toast.error(`فشل في جلب تفاصيل المدرب لـ ID: ${mentorId}`);
      return { name: "غير معروف" };
    }
  };

  // Filter data based on selected filter
  useEffect(() => {
    let filteredData = acceptedUsers;

    if (filter === "today") {
      const today = new Date();
      filteredData = acceptedUsers.filter(
        (user) =>
          new Date(user.createdAt).toDateString() === today.toDateString()
      );
    } else if (filter === "week") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filteredData = acceptedUsers.filter(
        (user) => new Date(user.createdAt) >= lastWeek
      );
    } else if (filter === "month") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filteredData = acceptedUsers.filter(
        (user) => new Date(user.createdAt) >= lastMonth
      );
    } else if (filter === "custom" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = acceptedUsers.filter(
        (user) =>
          new Date(user.createdAt) >= start && new Date(user.createdAt) <= end
      );
    }

    setFilteredUsers(filteredData);
    setTotalEquity(filteredData.reduce((sum, user) => sum + user.equity, 0));
  }, [filter, startDate, endDate, acceptedUsers]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">جارٍ التحميل...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container fluid="md" className="my-4">
      <h2 className="text-center mb-4">تقرير المستخدمين المقبولين</h2>

      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>اختر الفلترة</Form.Label>
              <Form.Select
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="all">الكل</option>
                <option value="today">اليوم</option>
                <option value="week">الأسبوع الماضي</option>
                <option value="month">الشهر الماضي</option>
                <option value="custom">تاريخ مخصص</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {filter === "custom" && (
            <>
              <Col>
                <Form.Group>
                  <Form.Label>من</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>إلى</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </>
          )}
        </Row>
      </Form>

      <Button className="my-3" onClick={handlePrint}>
        طباعة التقرير
      </Button>

      <div ref={reportRef}>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>القيمة المالية</th>
              <th>تاريخ القبول</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{mentors[user.mentor]?.name || "غير معروف"}</td>
                <td>{user.equity} دك</td>
                <td>{format(new Date(user.createdAt), "dd/MM/yyyy", { locale: arSA })}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">الإجمالي</td>
              <td>{totalEquity} دك</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AcceptSalary;
