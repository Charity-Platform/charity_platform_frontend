import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table, Container, Row, Col, Spinner } from 'react-bootstrap';

const AcceptSalary = () => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mentors, setMentors] = useState({}); // To store mentor names based on their IDs
  const [mentorTotal, setMentorTotal] = useState({}); // To store the total amount for each mentor
  const [totalEquity, setTotalEquity] = useState(0); // Total sum of all equity values

  // Fetch accepted users and their mentor details
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
          return {}; // If no mentor, return empty object
        });

        const mentorDetailsResults = await Promise.all(mentorPromises);
        const updatedMentorDetails = Object.assign({}, ...mentorDetailsResults);

        // Calculate total equity sent to each mentor
        const totalEquityForMentors = data.reduce((acc, user) => {
          if (user.mentor) {
            acc[user.mentor] = (acc[user.mentor] || 0) + user.equity;
          }
          return acc;
        }, {});

        // Calculate the total sum of all equity values
        const totalEquityValue = data.reduce((sum, user) => sum + user.equity, 0);

        setMentors(updatedMentorDetails);
        setMentorTotal(totalEquityForMentors);
        setTotalEquity(totalEquityValue); // Set the total sum of equity
        setAcceptedUsers(data);
      } catch (error) {
        setError('البيانات غير صحيحة');
        toast.error('البيانات غير صحيحة');
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedUsers();
  }, []);

  // Fetch mentor details
  const fetchMentorDetails = async (mentorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}mentors/${mentorId}`,
        { withCredentials: true }
      );
      const { name, email, balance, fees, address } = response.data.data;
      return { name, email, balance, fees, address };
    } catch (error) {
      toast.error(`فشل في جلب تفاصيل المدرب لـ ID: ${mentorId}`);
      return {
        name: 'غير معروف',
        email: 'غير متوفر',
        balance: 0,
        fees: 0,
        address: 'غير متوفر',
      };
    }
  };

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

  return (
    <Container fluid="md" className="my-4">
      <h2 className="text-center mb-4">قائمة المستخدمين المقبولين</h2>

      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>القيمة المالية المتحولة</th>
            <th>تاريخ القبول</th>
            <th>المبلغ الإجمالي للادمن </th> {/* Add column to display total sent to mentor */}
          </tr>
        </thead>
        <tbody>
          {acceptedUsers.length > 0 ? (
            acceptedUsers.map((user) => {
              const mentorInfo = mentors[user.mentor] || {}; // Get mentor info using mentorId
              const totalForMentor = mentorTotal[user.mentor] || 0; // Get total sent to mentor

              return (
                <tr key={user._id}>
                  <td>
                    {mentorInfo.name ? mentorInfo.name : `اسم المستخدم: ${user.mentor}`}
                  </td>
                  <td>{user.equity}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  {/* <td>{totalForMentor} دك</td> Display total amount for mentor */}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">لا يوجد مستخدمين مقبولين حالياً</td>
            </tr>
          )}

          {/* Add an empty row for displaying the total amount */}
          <tr>
            <td colSpan="3" className="text-end"><strong>الإجمالي:</strong></td>
            <td>{totalEquity} دك</td> {/* Display the total equity sum */}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default AcceptSalary;
