import React, { useEffect } from "react";
import EmailField from "src/components/AuthPages/LogInPage/LogInEmail/EmailField";
import PasswordField from "src/components/AuthPages/LogInPage/LoginPass/LoginPassword";
import SignupConfirm from "src/components/AuthPages/SignupPage/SignupConfirmPass/SignupConfirm";

const SignupPage = () => {
  useEffect(() => {
    console.log("Signup component mounted");

    return () => {
      console.log("Signup component unmounted");
    };
  }, []);

  return (
    <div className="signup-page">
      <EmailField />
      <PasswordField />
      <SignupConfirm />
    </div>
  );
};

export default SignupPage;
