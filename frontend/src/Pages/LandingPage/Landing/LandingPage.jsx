import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/Pages/LandingPage/Footer/Footer";
import { useDispatch } from "react-redux";
import { getBlogsInCategory } from "src/redux/slices/blogs";

function LandingPage() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("nature");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getBlogsInCategory(category));
        console.log("Successful response data:", response.payload);
        setBlogs(response.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {}, [blogs]);

  return (
    <div className={styles.landingPage}>
      <AuthButtons />
      <h1 className={styles.yourClass}>the happy blog</h1>
      <div className={styles.buttonContainer}>
        <button
          className={styles.blogButton}
          onClick={() => setCategory("nature")}
        >
          Nature
        </button>
        <button
          className={styles.blogButton}
          onClick={() => setCategory("technology")}
        >
          Technology
        </button>
        <button
          className={`${styles.blogButton} ${styles["life-button"]}`}
          onClick={() => setCategory("life")}
        >
          Life
        </button>
      </div>
      <div className={styles.blogImg}>
        {Array.isArray(blogs.blogs) &&
          blogs.blogs.map((eachBlog) => (
            <ImageGallery
              key={eachBlog.id}
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
