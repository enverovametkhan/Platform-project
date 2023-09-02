import React, { useEffect } from "react";
import "./LoginPage.css";
import Login from "src/components/AuthPages/LogInPage/LoginHeader/LoginHeader";
import EmailField from "src/components/AuthPages/LogInPage/LogInEmail/EmailField";
import PasswordField from "src/components/AuthPages/LogInPage/LoginPass/LoginPassword";
import LoginButton from "src/components/AuthPages/LogInPage/LoginButton/LoginButton";
import ForgotPasswordLink from "src/components/AuthPages/LogInPage/LoginForgotPass/ForgotPasswordLink";

const LoginPage = () => {
  useEffect(() => {
    console.log("LoginPage component mounted");

    return () => {
      console.log("LoginPage component unmounted");
    };
  }, []);

  return (
    <div className="login-page">
      <Login />
      <EmailField />
      <PasswordField />
      <LoginButton />
      <ForgotPasswordLink />
    </div>
  );
};

export default LoginPage;
