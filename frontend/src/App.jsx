import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// import Landingpage from "./Pages/Landingpage.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import Registrationpage from "./Pages/Registrationpage.jsx";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Landingpage />} /> */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registrationpage />} />
          {/* Catch-all route for 404 Not Found page */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
