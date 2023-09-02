import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordLink = () => {
  return (
    <Link to="resetpass/">
      <button className="forgot-butt">Forgot Password</button>
    </Link>
  );
};

export default ForgotPasswordLink;
