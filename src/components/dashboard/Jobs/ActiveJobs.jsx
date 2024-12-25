import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

const ActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}jobs/active`);
        setJobs(response.data);
      } catch (err) {
        setError("يوجد مشكله فى عرض الوظايف الرجاء تكرار تحميل الصفحة مرة اخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveJobs();
  }, []);

  const handleActivateJob = async (jobId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`,
        { isActive: false },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("تم ايقاف عرض الاعلان مؤقتا.");
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch {
      alert("لم يتم ايقاف الخدمة، يوجد مشكلة، الرجاء إعادة المحاولة.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`, { withCredentials: true });
      alert("تم حذف طلب الوظيفة بنجاح.");
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch {
      alert("لم يتم حذف الوظيفة، الرجاء إعادة المحاولة.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
        <div className="ml-3">جاري التحميل، رجاء انتظر...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">الوظائف النشطة داخل المنصة</h1>

      {jobs.length === 0 ? (
        <div className="text-center text-muted">لا توجد وظائف نشطة حاليًا.</div>
      ) : (
        <Row xs={1} sm={2} lg={2} className="g-4">
          {jobs.map((job) => (
            <Col key={job._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.type}</Card.Subtitle>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="warning"
                      onClick={() => handleActivateJob(job._id)}
                      className="m-2"
                    >
                      ايقاف مؤقت لاعلان الوظيفة
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteJob(job._id)}
                      className="m-2"
                    >
                      حذف الوظيفة نهائيًا
                    </Button>
                    <Link to={`/jobs/applications/${job._id}`} className="btn btn-success m-2">
                      عرض المتقدمين للوظيفة
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ActiveJobs;
