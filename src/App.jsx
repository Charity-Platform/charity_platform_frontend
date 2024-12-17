import Home from "./pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Instructors from "./pages/Instructors/Instructors";
import Services from "./pages/Services/Services";
import Cources from './pages/Cources/Cources'
import Books from "./pages/BookStore/Books";
import Contact from "./pages/Contact/Contact";
import Login from "./components/LoginAndRegister/Login";
import Blog from "./pages/Blogs/Blog";
import Comunity from "./pages/Comunity/Comunity";
import Profile from "./components/Profile/Profile";
import DashBoard from "./pages/dashboard/DashBoard";
import AllUser from './components/dashboard/AllUsers/AllUser'
import Instructordash from './components/dashboard/InstractorDash'
import BlogsDash from './components/dashboard/BlogsDash'
import ActivePass from "./components/LoginAndRegister/ActivePass";
import Rechangepass from "./components/LoginAndRegister/Rechangepass";
import ContactDash from "./components/dashboard/ContactDash";
import RequireAuth from "./components/LoginAndRegister/RequireAuth";
import Questions from './components/dashboard/AllQuestions/questions'
import AllQuestions from "./components/dashboard/AllQuestions/AllQuestions";
import SignupInstructor from "./components/Monitors/SignupInstructor";
import Nonactivemonitor from "./components/Monitors/Nonactivemonitor";
import Activemonitor from "./components/Monitors/Activemonitor";
import CerateCourses from "./components/Courses/CerateCourses";
import AllCourses from "./components/Courses/AllCourses";
import VerifyEmail from "./components/Monitors/VerifyEmail";
import RightSideMentor from "./components/Monitors/MentorDashBoard/RightSideMentor";
import CreateCourse from "./components/Monitors/MentorDashBoard/CreateCourse";
import AllMentorCourse from "./components/Monitors/MentorDashBoard/AllMentorCourse";
import CourseDetails from "./components/Monitors/MentorDashBoard/CourseDetails";
import CoursesDetails from "./components/Cources/CoursesDetails";
import CourseVides from "./components/Cources/CourseVides";
import InstructorDetails from "./components/instructors/InstructorDetails";
import Instructions from "./components/Monitors/MentorDashBoard/Instructions";
import AllInstructions from "./components/Monitors/MentorDashBoard/AllInstructions";
import AllTickets from "./components/dashboard/AllTickets/AllTickets";
import NewCourses from "./components/Monitors/MentorDashBoard/NewCourses";
import AllBooks from "./components/Monitors/MentorDashBoard/AllBooks";
import BookDetails from "./components/BookStore/BookDetails";
import JobForm from "./components/jobs/JobForm";
import Fullservices from "./components/HomePage/services/Fullservices";
import AllBooksDash from './components/dashboard/Books/AllBooks'
import AddBooks from "./components/dashboard/Books/AddBooks";
import Englishapge from "./components/EnglishPage/Englishapge";
import ContactForm from "./components/EnglishPage/ContactForm";
import Community_Platform from "./components/companyJobs/Comunity_platform";
import Jobs from "./components/jobs/Jobs";
import Not_Active from "./components/dashboard/Jobs/Not_Active";
import ActiveJobs from "./components/dashboard/Jobs/ActiveJobs";
import JobApplicationForm from "./components/jobs/JobApplicationForm";
import JobsApplied from "./components/dashboard/Jobs/JobsApplied";
import LoadingForCheck from "./components/pyment/LoadingForCheck";
import ServicesPayment from "./components/pyment/ServicesPyment";
import Thanks from "./components/pyment/Thanks";
import CoursesPyment from "./components/Cources/pymentcourses/CoursesPyment";
import LoadingForCheckCourses from "./components/Cources/pymentcourses/LoadingForCheckCourses";
import ThanksCourse from "./components/Cources/pymentcourses/ThanksCourse";
import BookPyment from "./components/BookStore/pymentBook/BookPyment";
import CheckBook from "./components/BookStore/pymentBook/CheckBook";
import ThanksBook from "./components/BookStore/pymentBook/ThanksBook";
import BookView from "./components/BookStore/BookView";
import AllRequestTeckets from "./components/dashboard/AllTickets/AllRequestTeckets";
function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
       {/* <Route element={<RequireAuth/>}> */}
          <Route path="/Cources" element={<Cources />} />
          <Route path="/books" element={<Books />} />
           <Route path="/blog" element={<Blog/>} />
      {/* </Route> */}
          <Route path="/login" element={<Login/>} />
         
          <Route path="/comunity" element={<Comunity/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/instructordash" element={<Instructordash/>} />
          <Route path="/allUser" element={<AllUser/>} />
          <Route path="/blogsDash" element={<BlogsDash/>} />
          <Route path="/activePass" element={<ActivePass/>} />
          <Route path="/rechangepass" element={<Rechangepass/>} />
          <Route path="/ContactDash" element={<ContactDash/>} />
          <Route path="/questions" element={<Questions/>} />
          <Route path="/AllrequestTeckets" element={<AllRequestTeckets/>} />

          
          <Route path="/allquestions" element={<AllQuestions/>} />
          <Route path="/instractor" element={<SignupInstructor/>} />
          <Route path="/noneactive" element={<Nonactivemonitor/>} />
          <Route path="/activemonitor" element={<Activemonitor/>} />
          <Route path="/createcourses" element={<CerateCourses/>} />
          <Route path="/allCourses" element={<AllCourses/>} />
          <Route path="/verifyemail" element={<VerifyEmail/>} />
          <Route path="/adminMentor/:mentorId" element={<RightSideMentor/>} />
          <Route path="/CreateCourse/:mentorId" element={<CreateCourse/>} />
          <Route path="/all-courses/:mentorId" element={<AllMentorCourse />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/CoursesDetails/:id" element={<CoursesDetails/>} />
          <Route path="/CourseVideos/:id" element={<CourseVides/>} />
          <Route path="/InstructorDetails/:id" element={<InstructorDetails/>} />
          <Route path="/instructions" element={<Instructions/>} />
          <Route path="/allinstructions/:mentorId" element={<AllInstructions />} />
          <Route path="/all_tickets" element={<AllTickets/>} />
          <Route path="/new_courses" element={<NewCourses/>} />
          <Route path="/all_books/:mentorId" element={<AllBooks/>} />
          <Route path="/book_details/:bookId" element={<BookDetails/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/comunity_platform" element={<Community_Platform/>} />
          <Route path="/job_form" element={<JobForm/>} />
          <Route path="/full-services" element={<Fullservices/>} />
          <Route path="/all_books" element={<AllBooksDash/>} />
          <Route path="/addbook" element={<AddBooks/>} />
          {/* <Route path="/reviewbook" element={<AddBooks/>} /> */}

          <Route path="/englishPage" element={<Englishapge/>} />
          <Route path="/ContactEnglish" element={<ContactForm/>} />
          <Route path="/notactive_jobs" element={<Not_Active/>} />
          <Route path="/active_jobs" element={<ActiveJobs/>} />
          <Route path="/applicationForm/:id" element={<JobApplicationForm/>} />
          <Route path="/jobs_founder" element={<JobsApplied/>} />
          <Route path="/loadingForCheck/auth/payment/consultation" element={<LoadingForCheck/>} />
          <Route path="/ServicesPayment/:id" element={<ServicesPayment/>} />
          <Route path="/thank-you" element={<Thanks/>} />
          <Route path="/CoursesPyment/:id" element={<CoursesPyment />} />
          <Route path="/loadingForCheck/auth/payment/course/:id" element={<LoadingForCheckCourses />} />
          <Route path="/thanksForCourse/:id" element={<ThanksCourse />} />
          <Route path="/bookpyment/:id" element={<BookPyment/>} />
          <Route path="/loadingForCheck/auth/request/payment/book/:id" element={<CheckBook/>} />
          <Route path="/thankbook/:id" element={<ThanksBook/>} />
          <Route path="/BookView/:id" element={<BookView/>} />

        




























       












  
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
