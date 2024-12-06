import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");

  const navigate = useNavigate();

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}jobs/active`
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleGoJobForm =(id)=>{
   navigate(`/applicationForm/${id}`);
   console.log(id);
  }
  // Fetch job by ID
  const handleShow = async (jobId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`
      );
      setSelectedJob(response.data);
      setShow(true);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectedJob(null);
  };
  const jobTypeTranslation = {
    remote: "عمل عن بعد",
    hybrid: "دوام جزئي",
    onsite: "دوام كامل",
  };
  // Handle job filtering
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    setFilterKeyword(keyword);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="jobs-container">
      <Container className="jobs-header-buttons">
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8} className="d-flex justify-content-center">
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              className="mb-2"
            >
              <ToggleButton
                id="tbg-btn-1"
                variant="outline-primary"
                value={1}
                onClick={() => navigate("")}
                className="mx-2"
              >
                الوظائف المتاحة
              </ToggleButton>
              <ToggleButton
                id="tbg-btn-2"
                variant="outline-primary"
                value={2}
                onClick={() => navigate("/comunity_platform")}
                className="mx-2"
              >
                أنا جهة توظيف
              </ToggleButton>
              <ToggleButton
                id="tbg-btn-3"
                variant="outline-primary"
                value={3}
                onClick={() => navigate("/job_form")}
                className="mx-2"
              >
                أنا أبحث عن عمل
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Container>
      <Container className="jobs-filter-section">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="ابحث في الوظائف حسب العنوان أو الوصف..."
              value={filterKeyword}
              onChange={handleFilter}
              className="jobs-filter-input"
            />
          </Col>
        </Row>
      </Container>

      {/* Jobs Listing */}
      <Container>
        <Row>
          {filteredJobs.map((job) => (
            <Col key={job._id} sm={12} md={6} lg={4}>
              <Card className="jobs-card mb-4">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {" "}
                    نوع العمل : {jobTypeTranslation[job.type] ||
                      "غير معروف"}{" "}
                  </Card.Subtitle>
                  <div className="d-flex justify-content-between ">
                    <Button
                    className="mx-1"
                      variant="primary"
                      onClick={() => handleShow(job._id)}
                    >
                      تفاصيل
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleGoJobForm(job._id)}
                    >
                      التقديم
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for job details */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل الوظيفة</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedJob ? (
              <div>
                <h5>{selectedJob.title}</h5>
                <p>
                  <strong>الوصف:</strong> {selectedJob.description}
                </p>
                <p>
                  <strong>نوع الوظيفة:</strong> {selectedJob.type}
                </p>
                {/* <p>
                  <strong>رابط الشركة:</strong>{" "}
                  <a
                    href={selectedJob.campanyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedJob.campanyWebsite}
                  </a>
                </p>
                <p>
                  <strong>رقم الشركة:</strong> {selectedJob.companyPhone}
                </p> */}
                <p>
                  <strong>تاريخ النشر:</strong>{" "}
                  {new Date(selectedJob.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>جاري تحميل التفاصيل...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Jobs;
