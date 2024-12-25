import React, { useEffect, useState } from "react";
import axios from "axios";

const Not_Active = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActive, setisActive] = useState("false");

  useEffect(() => {
    const fetchNotActiveJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}jobs/not-active`
        );
        setJobs(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotActiveJobs();
  }, []);

  const handleActivateJob = async (jobId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`,
        { isActive: true }, // Correctly send the request body
        {
          headers: {
            "Content-Type": "application/json", // Optional, but good practice
          },
        }
      );

      alert("تم تفعيل وعرض الخدمة بنجاح داخل المنصة");
      setJobs(jobs.filter((job) => job._id !== jobId)); // Update jobs list
    } catch (error) {
      alert("لم يتم تفعيل الخدمة، يوجد مشكلة، الرجاء إعادة المحاولة");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`, {
        withCredentials: true,
      });
      alert("تم حذف طلب الوظيفة بنجاح ");
    } catch (error) {
      alert("لم يتم حذف الوظيفة الرجاء اعادة المحاولة ");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center text-secondary">جارى التحميل، رجاءا انتظر...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center text-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">الوظائف غير النشطة</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-muted">لا توجد وظائف غير نشطة حاليًا.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {jobs.map((job) => (
            <div key={job._id} className="col">
              <div className="card h-100 shadow-sm border-light rounded">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">
                    <strong>نوع الوظيفة:</strong> {job.type}
                  </p>
                  <p className="card-text">
                    <strong>الوصف:</strong> {job.description}
                  </p>
                  <p className="card-text">
                    <strong>موقع المؤسسة:</strong>{" "}
                    <a
                      href={job.campanyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {job.campanyWebsite}
                    </a>
                  </p>
                  <p className="card-text">
                    <strong>هاتف المؤسسة:</strong> {job.companyPhone}
                  </p>
                </div>
                <div className="card-footer text-center">
                  {/* Activate and Delete buttons */}
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      onClick={() => handleActivateJob(job._id)}
                      className="btn btn-primary btn-sm w-50"
                    >
                      تفعيل الوظيفة
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="btn btn-danger btn-sm w-50"
                    >
                      حذف الوظيفة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Not_Active;
