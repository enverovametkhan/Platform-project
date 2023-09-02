import React, { useEffect } from "react";
import "./LoginPage.css";
import Login from "src/components/LogInPage/LoginHeader/LoginHeader";
import EmailField from "src/components/LogInPage/LogInEmail/EmailField";
import PasswordField from "src/components/LogInPage/LoginPass/LoginPassword";
import LoginButton from "src/components/LogInPage/LoginButton/LoginButton";
import ForgotPasswordLink from "src/components/LogInPage/LoginForgotPass/ForgotPasswordLink";

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
