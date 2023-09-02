import React, { useEffect } from "react";
import PasswordField from "src/components/AuthPages/LogInPage/LoginPass/LoginPassword";

const ConfirmPassPage = () => {
  useEffect(() => {
    console.log("ConfirmPassPage component mounted");

    return () => {
      console.log("ConfirmPassPage component unmounted");
    };
  }, []);

  return (
    <div className="confirmpass">
      <PasswordField />
    </div>
  );
};

export default ConfirmPassPage;
