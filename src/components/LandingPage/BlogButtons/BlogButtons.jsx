import React from "react";
import "./BlogButtons.css";

class BlogButtons extends React.Component {
  handleClick = (section) => {
    console.log(`Navigating to ${section} section`);
  };

  render() {
    return (
      <div className="button-container">
        {" "}
        <button onClick={() => this.handleClick("myblog")}>My blog</button>
        <button onClick={() => this.handleClick("technology")}>
          Technology
        </button>
        <button
          className="life-button"
          onClick={() => this.handleClick("life")}
        >
          Life
        </button>
      </div>
    );
  }
}

export default BlogButtons;
