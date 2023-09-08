import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router";

const BlogComponents = () => {
  const [setSection] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log("BlogComponents component mounted");

    return () => {
      console.log("BlogComponents component unmounted");
    };
  }, []);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log(`Toggled to ${isChecked ? "Off" : "On"}`);

    if (isChecked) {
      console.log("Toggle is Off.");
    } else {
      console.log("Toggle is On.");
    }
  };

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
            <p className={styles.blogText}>Category</p>
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
            {isChecked ? "Public" : "Private"}
          </div>
          <div className={styles.toggleGroup}>
            <label className="switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span className="slider round"></span>
            </label>
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
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BlogComponents;
