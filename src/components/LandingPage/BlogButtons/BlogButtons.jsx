import React, { useState, useEffect } from "react";
import "./BlogButtons.css";

const BlogButtons = () => {
  const [section, setSection] = useState("");

  const handleClick = (section) => {
    setSection(section);
    console.log(`Navigating to ${section} section`);
  };

  useEffect(() => {
    console.log(`Current section: ${section}`);
  }, [section]);

  return (
    <div className="button-container">
      <button onClick={() => handleClick("myblog")}>My blog</button>
      <button onClick={() => handleClick("technology")}>Technology</button>
      <button className="life-button" onClick={() => handleClick("life")}>
        Life
      </button>
    </div>
  );
};

export default BlogButtons;
