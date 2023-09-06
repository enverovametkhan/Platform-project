import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";

const BlogComponents = () => {
  const [setSection] = useState("");

  useEffect(() => {
    console.log("BlogComponents component mounted");

    return () => {
      console.log("BlogComponents component unmounted");
    };
  }, []);

  const handleClick = (section) => {
    setSection(section);
    console.log(`Navigating to ${section} section`);

    if (section === "Image Upload") {
      console.log("Handling Image Upload...");
    }
  };

  return (
    <div className={styles.blogComponents}>
      <form className={styles.form}>
        <div className={styles.labelGroup}>
          <label htmlFor="title" className={styles.myLabel}>
            Title
          </label>
          <input type="text" id="title" className={styles.blogInput} />
        </div>

        <div className={styles.labelGroup}>
          <label htmlFor="content" className={styles.myLabel}>
            Content
          </label>
          <textarea
            id="content"
            rows="8"
            cols="50"
            className={styles.blogTextarea}
          ></textarea>
        </div>

        <div className={styles.buttonColumn}>
          <div className={styles.buttonGroup}>
            <p className={styles.blogText}>Company</p>
            <button className={styles.blogBut} type="submit">
              My blog
            </button>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.blogBut} ${styles["image-upload"]}`}
              onClick={() => handleClick("Image Upload")}
            >
              Image upload
            </button>
          </div>
        </div>

        <div className={styles.visCont}>
          <div className={styles.visText}>Visibility</div>
          <div className={styles.pubText}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
            >
              <path
                d="M8 15C3.58698 15 0 11.6372 0 7.5C0 3.36279 3.58698 0 8 0C12.413 0 16 3.36279 16 7.5C16 11.6372 12.413 15 8 15ZM8 1.04651C4.20465 1.04651 1.11628 3.94186 1.11628 7.5C1.11628 11.0581 4.20465 13.9535 8 13.9535C11.7953 13.9535 14.8837 11.0581 14.8837 7.5C14.8837 3.94186 11.7953 1.04651 8 1.04651Z"
                fill="#292D32"
              />
              <path
                d="M6.94288 9.99765C6.79404 9.99765 6.65265 9.94184 6.54846 9.84416L4.44238 7.86974C4.22656 7.66742 4.22656 7.33254 4.44238 7.13021C4.65819 6.92788 5.0154 6.92788 5.23122 7.13021L6.94288 8.73486L10.768 5.14881C10.9838 4.94649 11.341 4.94649 11.5568 5.14881C11.7726 5.35114 11.7726 5.68602 11.5568 5.88835L7.3373 9.84416C7.23311 9.94184 7.09172 9.99765 6.94288 9.99765Z"
                fill="#292D32"
              />
            </svg>
            Public
          </div>
        </div>
      </form>
      <div className={styles.savedeleteGroup}>
        <button className={styles.compButGreen} type="submit">
          Save
        </button>
        <button className={styles.compButRed} type="submit">
          Delete
        </button>
      </div>
      <div>
        {" "}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BlogComponents;
