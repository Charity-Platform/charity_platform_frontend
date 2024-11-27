import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActive , setisActive] =useState("")
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchNotActiveJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}jobs/active`
        );
        setJobs(response.data);
        console.log(response.data);
      } catch (err) {
        setError("يوجد مشكله فى عرض الوظايف الرجاء تكرار تحميل الصفحة مرة اخرى ");
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
        { isActive: false }, // Correctly send the request body
        {
          headers: {
            "Content-Type": "application/json", // Optional, but good practice
          },
        }
      );
  
      alert("تم ايقاف عرض الاعلان مؤقتا ");
      setJobs(jobs.filter((job) => job._id !== jobId)); // Update jobs list
    } catch (error) {
      alert("لم يتم ايقاف الخدمة، يوجد مشكلة، الرجاء إعادة المحاولة");
    }
  };
  
     const handleDeleteJob = async (jobId) =>{
       try{
        const response = await axios.delete(`${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`,
        {
           withCredentials:true 
        });
        alert("تم حذف طلب الوظيفة بنجاح ");

       }catch(error){
        alert("لم يتم حذف الوظيفة الرجاء اعادة المحاولة ");
       }

     }

     const handleDetails = async (jobId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}jobs/${jobId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSelectedJob(response.data); // Store the job details
        setIsModalOpen(true); // Open the modal
      } catch (error) {
        alert("حدث خطأ أثناء جلب معلومات الوظيفة");
      }
    };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600 text-center ">جارى التحميل رجاءا انتظر...</div>
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
      <h1 className="text-3xl font-bold text-center mb-8 m-10">الوظائف النشطة حاليا داخل المنصة </h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد وظائف  نشطة حاليًا.</p>
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

              <div className="flex justify-end ">
                <button
                  onClick={() => handleActivateJob(job._id)}
                  className="bg-blue-500 text-white px-4 py-2 m-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  ايقاف مؤقت لاعلان الوظيفة
                </button>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  حذف الوظيفة نهائيا
                </button>
              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveJobs;
