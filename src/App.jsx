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




        </Routes>
      </Router>
    </div>
  );
}

export default App;
