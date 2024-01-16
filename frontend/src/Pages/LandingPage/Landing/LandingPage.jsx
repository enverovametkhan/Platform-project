import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import max from "src/Assets/max.avif";
import styles from "./main.module.scss";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/Pages/LandingPage/Footer/Footer";
import { getBlogsInCategory } from "src/redux/slices/blogs";
import { selectIsAuthenticated } from "src/redux/slices/auth";

export function LandingPage() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("nature");
  const [blogs, setBlogs] = useState([]);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await dispatch(getBlogsInCategory(category));
        console.log("Successful response data:", blogs.payload);
        if (Array.isArray(blogs.payload)) {
          setBlogs(blogs.payload);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className={styles.landingPage}>
      {!isAuthenticated && <AuthButtons />}{" "}
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
      <div className={styles.imageGalleryContainer}>
        {blogs.map((eachBlog) => (
          <div key={eachBlog._id} className={styles.imageGallery}>
            <div className={styles.imageContainer}>
              <Link to={`/blog/${eachBlog._id}`} className={styles.linkStyle}>
                <img
                  className={styles.image}
                  src={eachBlog.image}
                  alt={`Image ${eachBlog._id}`}
                />
                <div className={styles.blogComp}>
                  <h1>{eachBlog.title}</h1>
                  <p>{eachBlog.likes}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {isAuthenticated && (
        <Link to="/dashboard/myaccount">
          <img className={styles.img} src={max} alt="Image" />
        </Link>
      )}
      <Footer />
    </div>
  );
}

export default LandingPage;
