import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordLink = () => {
  useEffect(() => {
    console.log("ForgotPasswordLink component mounted");

    return () => {
      console.log("ForgotPasswordLink component unmounted");
    };
  }, []);

  return <Link to="/resetpass">Forgot Password</Link>;
};

export default ForgotPasswordLink;
