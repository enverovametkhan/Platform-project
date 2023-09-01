import React from "react";
import "./Footer.css";

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer-text">
          Copyright © 2023 the happy blog. All rights reserved.
        </p>
        <p className="footer-text">Privacy Policy</p>
        <p className="footer-text">Terms of Use</p>
        <p className="footer-text">Site Map</p>
        <p className="footer-text">Kazakhstan</p>
      </footer>
    );
  }
}
