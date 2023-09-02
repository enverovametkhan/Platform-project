import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "src/components/LandingPage/LandingPage";
import SignupPage from "src/components/AuthPages/SignupPage/SignupPage";
import LoginPage from "src/components/AuthPages/LogInPage/LoginPage/LoginPage";
import ResetPassPage from "src/components/AuthPages/ResetPass/ResetPassPage";
import CheckEmailPassPage from "src/components/AuthPages/CheckEmailPass/CheckEmailPassPage";
import CheckemailSignupPage from "src/components/AuthPages/CheckEmailSignUp/CheckemailSignupPage";
import ConfirmPassPage from "src/components/AuthPages/ConfirmPass/ConfirmPassPage";
import PassChangedPage from "src/components/AuthPages/PassChanged/PassChangedPage";
import ThankEmailPage from "src/components/AuthPages/ThankEmail/ThankEmailPage";

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
          <Route path="/checkreset" element={<CheckEmailPassPage />} />
          <Route path="/confirmpass" element={<ConfirmPassPage />} />
          <Route path="/passchanged" element={<PassChangedPage />} />
          <Route path="/checkemail" element={<CheckemailSignupPage />} />
          <Route path="/thankemail" element={<ThankEmailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
