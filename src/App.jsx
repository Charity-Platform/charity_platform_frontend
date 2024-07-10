import Home from "./pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Instructors from "./pages/Instructors/Instructors";
import Services from "./pages/Services/Services";
import Cources from './pages/Cources/Cources'
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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
