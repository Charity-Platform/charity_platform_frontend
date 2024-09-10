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
import FormBlog from "./components/Blogs/FormBlog";
import Comunity from "./pages/Comunity/Comunity";
import Profile from "./components/Profile/Profile";
import DashBoard from "./pages/dashboard/DashBoard";
import AllUser from './components/dashboard/AllUser'
import Instructordash from './components/dashboard/InstractorDash'
import BlogsDash from './components/dashboard/BlogsDash'
import ActivePass from "./components/LoginAndRegister/ActivePass";
import Rechangepass from "./components/LoginAndRegister/Rechangepass";
import ContactDash from "./components/dashboard/ContactDash";
import RequireAuth from "./components/LoginAndRegister/RequireAuth";
import Questions from './components/dashboard/questions'
import AllQuestions from "./components/dashboard/AllQuestions";
import SignupInstructor from "./components/Monitors/SignupInstructor";
import Nonactivemonitor from "./components/Monitors/Nonactivemonitor";
import Activemonitor from "./components/Monitors/Activemonitor";

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
       <Route element={<RequireAuth/>}>
          <Route path="/Cources" element={<Cources />} />
          <Route path="/books" element={<Books />} />
           <Route path="/blog" element={<Blog/>} />
      </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/FormBlog" element={<FormBlog/>} />
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
          <Route path="/allquestions" element={<AllQuestions/>} />
          <Route path="/instractor" element={<SignupInstructor/>} />
          <Route path="/noneactive" element={<Nonactivemonitor/>} />
          <Route path="/activemonitor" element={<Activemonitor/>} />










  
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
