import React, { useEffect } from "react";
import EmailField from "src/components/AuthPages/LogInPage/LogInEmail/EmailField";
import "./ResetPassPage.css";
const ResetPassPage = () => {
  useEffect(() => {
    console.log("ResetPassPage component mounted");

    return () => {
      console.log("ResetPassPage component unmounted");
    };
  }, []);

  return (
    <div className="resetpass">
      <h1>Reset Password</h1>
      <p>Enter the email you use to sign in.</p>
      <EmailField />
    </div>
  );
};

export default ResetPassPage;
