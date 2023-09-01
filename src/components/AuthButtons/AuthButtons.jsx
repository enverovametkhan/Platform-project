import React from "react";
import "./AuthButtons.css";

class AuthButtons extends React.Component {
  render() {
    return (
      <div className="auth-buttons">
        <button className="auth-button">Log In</button>
        <button className="auth-button">Sign Up</button>
      </div>
    );
  }
}

export default AuthButtons;
