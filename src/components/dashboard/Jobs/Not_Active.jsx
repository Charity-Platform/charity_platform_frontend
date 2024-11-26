import React, { useEffect, useState } from "react";
import axios from "axios";

const Not_Active = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotActiveJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}jobs/not-active`
        );
        setJobs(response.data);
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
      const response = await axios.put(
        `${import.meta.env.VITE_MAIN_URL}jobs/active/${jobId}`
      );
      alert("Job activated successfully!");
      // Optionally, you can refetch the jobs or update the local state
      setJobs(jobs.filter((job) => job._id !== jobId)); // Remove the activated job from the list
    } catch (error) {
      alert("Failed to activate job. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">الوظائف غير النشطة</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد وظائف غير نشطة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">نوع الوظيفة:</span> {job.type}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">الوصف:</span> {job.description}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">موقع المؤسسة:</span>{" "}
                <a
                  href={job.campanyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {job.campanyWebsite}
                </a>
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">هاتف المؤسسة:</span> {job.companyPhone}
              </p>

              {/* Activate Job Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleActivateJob(job._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  تفعيل الوظيفة
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Not_Active;
