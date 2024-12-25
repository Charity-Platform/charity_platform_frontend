// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Card, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AllSalaryRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [mentorDetails, setMentorDetails] = useState({});
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch all requests and mentor details
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_MAIN_URL}mentors/pending-deposites`,
//           { withCredentials: true }
//         );
//         const data = response.data.data;

//         const mentorPromises = data.map(async (request) => {
//           const mentorInfo = await fetchMentorDetails(request.mentor);
//           return { [request.mentor]: mentorInfo };
//         });

//         const mentorDetailsResults = await Promise.all(mentorPromises);
//         const updatedMentorDetails = Object.assign({}, ...mentorDetailsResults);

//         setMentorDetails(updatedMentorDetails);
//         setRequests(data);
//       } catch (error) {
//         toast.error('فشل في جلب الطلبات');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Fetch complete mentor details by ID
//   const fetchMentorDetails = async (mentorId) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_MAIN_URL}mentors/${mentorId}`,
//         { withCredentials: true }
//       );

//       const { name, email, balance, fees, address } = response.data.data;
//       return { name, email, balance, fees, address };
//     } catch (error) {
//       toast.error(`فشل في جلب تفاصيل المدرب لـ ID: ${mentorId}`);
//       return {
//         name: 'غير معروف',
//         email: 'غير متوفر',
//         balance: 0,
//         fees: 0,
//         address: 'غير متوفر',
//       };
//     }
//   };

//   // Handle Accept Order
//   const acceptOrder = async (id, mentorBalance, equity) => {
//     if (!id) {
//       toast.error('معرف الطلب غير صحيح');
//       return;
//     }
  
//     // Check if the mentorBalance is less than the equity
//     if (mentorBalance < equity) {
//       toast.error(`رصيدك غير كافي لقبول الطلب. لديك ${mentorBalance} بينما يتطلب ${equity}.`);
//       return;
//     }
  
//     console.log("id is", id);
//     // Log the actual URL being sent
//     const requestUrl = `${import.meta.env.VITE_MAIN_URL}mentors/accept-deposite/${id}`;
  
//     try {
//       const response = await axios.post(requestUrl, null, { withCredentials: true });
//       if (response.status === 200) {
//         toast.success('تم قبول الطلب بنجاح');
//         setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
//         setShowModal(false); 
//       }
//     } catch (error) {
//       console.error('Error occurred while accepting order:', error);
  
//       if (error.response) {
//         if (error.response.data?.message) {
//           toast.error(`خطأ: ${error.response.data.message}`);
//         } else {
//           toast.error('حدث خطأ في السيرفر');
//         }
//       } else {
//         toast.error('خطأ غير معروف');
//       }
//     }
//   };
  
  

//   // Open modal with selected request details
//   const handleOpenModal = (request) => {
//     setSelectedRequest(request);
//     setShowModal(true);
//   };

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">طلبات الرواتب</h2>
//       {isLoading ? (
//         <div className="text-center">
//           <Spinner animation="border" />
//         </div>
//       ) : requests.length > 0 ? (
//         <Row xs={1} md={2} lg={3} className="g-4">
//           {requests.map((request) => {
//             const mentorInfo = mentorDetails[request.mentor] || {};
//             return (
//               <Col key={request._id}>
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>مقدم الطلب: {mentorInfo.name || 'جاري التحميل...'}</Card.Title>
//                     <Card.Text>المبلغ المطلوب: {request.equity} دك</Card.Text>
//                     <Card.Text>تاريخ الطلب: {new Date(request.createdAt).toLocaleDateString()}</Card.Text>
//                     <Button variant="primary" onClick={() => handleOpenModal(request)}>
//                       التفاصيل
//                     </Button>
//                     <Button
//                       variant="success"
//                       onClick={() => acceptOrder(request._id)}
//                       className="ms-2"
//                     >
//                       قبول الطلب
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       ) : (
//         <p className="text-center">لا توجد طلبات حالياً.</p>
//       )}

//       {/* Modal for Request Details */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>تفاصيل الطلب</Modal.Title>
//         </Modal.Header>
//         <Modal.Body dir="rtl">
//           {selectedRequest ? (
//             <div>
//               <p><strong>اسم المدرب:</strong> {mentorDetails[selectedRequest.mentor]?.name}</p>
//               <p><strong>البريد الإلكتروني:</strong> {mentorDetails[selectedRequest.mentor]?.email}</p>
//               <p><strong>الرصيد:</strong> {mentorDetails[selectedRequest.mentor]?.balance} دك</p>
//               <p><strong>الرسوم المخصومة:</strong> {mentorDetails[selectedRequest.mentor]?.fees} دك</p>
//               <p><strong>المبلغ المطلوب:</strong> {selectedRequest.equity} دك</p>
//               <p><strong>تاريخ الطلب:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
//             </div>
//           ) : (
//             <p>تعذر جلب التفاصيل.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             إغلاق
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
//     </Container>
//   );
// };

// export default AllSalaryRequest;