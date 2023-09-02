import React, { useEffect } from "react";

function Header() {
  useEffect(() => {
    document.title = "The Happy Blog";
  }, []);

  return (
    <div className="header">
      <header>
        <h1>the happy blog</h1>
      </header>
    </div>
  );
}

export default Header;
