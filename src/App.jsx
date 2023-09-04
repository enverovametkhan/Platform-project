import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "src/Pages/LandingPage/Landing/LandingPage";
import SignupPage from "src/Pages/AuthPages/SignupPage/SignupPage";
import LoginPage from "src/Pages/AuthPages/LogInPage/LoginPage/LoginPage";
import ResetPassPage from "src/Pages/AuthPages/ResetPass/ResetPassPage";
import ConfirmNewPassPage from "src/Pages/AuthPages/ConfirmNewPass/ConfirmNewPassPage";

function App() {
  useEffect(() => {
    console.log("App component mounted");

    return () => {
      console.log("App component unmounted");
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resetpass" element={<ResetPassPage />} />
          <Route path="/confirmpass" element={<ConfirmNewPassPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
