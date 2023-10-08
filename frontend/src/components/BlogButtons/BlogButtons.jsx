import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { setCategory } from "src/redux/imageSlice";
import styles from "./main.module.scss";

const BlogButtons = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  const handleClick = async (category) => {
    dispatch(setCategory(category));
    console.log(`Navigating to ${category} section`);

    try {
      const response = await Axios.get(`/public/blog/category/${category}`);
      console.log("Response from backend:", response.userData);

      setBlogs(response.dummyBlogs);
    } catch (error) {
      console.error("Error sending request to backend:", error);
    }
  };

  useEffect(() => {
    console.log("Blogs:", blogs);
  }, [blogs]);

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.blogButton}
        onClick={() => handleClick("myblog")}
      >
        My blog
      </button>
      <button
        className={styles.blogButton}
        onClick={() => handleClick("technology")}
      >
        Technology
      </button>
      <button
        className={`${styles.blogButton} ${styles["life-button"]}`}
        onClick={() => handleClick("life")}
      >
        Life
      </button>
    </div>
  );
};

export default BlogButtons;
