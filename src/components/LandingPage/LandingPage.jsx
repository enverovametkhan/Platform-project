import React, { useEffect } from "react";
import "./LandingPage.css";

function LandingPage() {
  useEffect(() => {
    document.title = "The Happy Blog";
  }, []);

  return (
    <div className="landing-page">
      <header>
        <h1>the happy blog</h1>
      </header>
    </div>
  );
}

export default LandingPage;
