import Home from "./component/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./component/AboutPage/About";
import Instructors from "./component/instructors/Instructors";
import Services from "./component/Service_instruct/Services";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
