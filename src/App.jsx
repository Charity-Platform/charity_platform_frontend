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

function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Cources" element={<Cources />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/FormBlog" element={<FormBlog/>} />
          <Route path="/comunity" element={<Comunity/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/instructordash" element={<Instructordash/>} />
          <Route path="/allUser" element={<AllUser/>} />
          <Route path="/blogsDash" element={<BlogsDash/>} />



  
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
