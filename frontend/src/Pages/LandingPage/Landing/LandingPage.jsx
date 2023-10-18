import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/Pages/LandingPage/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getBlogsInCategory,
  setCurrentCategory,
  selectCurrentCategory,
} from "src/redux/slices/blogs";

function LandingPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const globalCategory = useSelector(selectCurrentCategory);
  const [category, setCategory] = useState("nature");
  const [blogs, setBlogs] = useState([]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    fetchData(selectedCategory);
  };

  const fetchData = async (selectedCategory) => {
    try {
      let response = await dispatch(getBlogsInCategory(selectedCategory));
      await dispatch(setCurrentCategory(selectedCategory));
      setBlogs(response.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData(category);
  }, [category, dispatch]);

  useEffect(() => {
    console.log(blogs);
    console.log(location);
  }, [blogs]);

  return (
    <div className={styles.landingPage}>
      <AuthButtons />
      <h1 className={styles.yourClass}>the happy blog</h1>
      <div className={styles.buttonContainer}>
        <button
          className={styles.blogButton}
          onClick={() => handleCategoryChange("nature")}
        >
          Nature
        </button>
        <button
          className={styles.blogButton}
          onClick={() => handleCategoryChange("technology")}
        >
          Technology
        </button>
        <button
          className={`${styles.blogButton} ${styles["life-button"]}`}
          onClick={() => handleCategoryChange("life")}
        >
          Life
        </button>
      </div>
      <div className={styles.blogImg}>
        {Array.isArray(blogs.blogs) &&
          blogs.blogs.map((eachBlog) => (
            <ImageGallery
              id={eachBlog.id}
              title={eachBlog.title}
              likes={eachBlog.likes}
              image={eachBlog.image}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
