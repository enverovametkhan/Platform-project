import React, { useEffect } from "react";
import "./AuthButtons.css";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="auth-buttons">
      <Link to="/login">
        <button className="auth-button">Log In</button>
      </Link>
      <Link to="/signup">
        <button className="auth-button">Sign Up</button>
      </Link>
    </div>
  );
};

export default AuthButtons;
