import React from "react";
import "./AuthButtons.css";
import { Link } from "react-router-dom";

class AuthButtons extends React.Component {
  render() {
    return (
      <div className="auth-buttons">
        <Link to="/login">
          <button className="auth-button">Log In</button>
        </Link>
        <button className="auth-button">Sign Up</button>
      </div>
    );
  }
}

export default AuthButtons;
