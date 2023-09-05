import React, { useEffect } from "react";
import styles from "./main.module.scss";
import ReccuringPage from "src/Pages/BlogPages/ReccuringPage/ReccuringPage";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";

function MyBlogs() {
  useEffect(() => {
    document.title = "My blogs";
  }, []);

  return (
    <div>
      <ReccuringPage />
      <div className={styles.myContainer}>
        <h1 className={styles.yourClass}>My blogs</h1>
        <BlogButtons />
        <ImageGallery />
      </div>
    </div>
  );
}

export default MyBlogs;
