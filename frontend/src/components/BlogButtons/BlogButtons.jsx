import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsInCategory } from "src/redux/slices/blogs";
import styles from "./main.module.scss";

const BlogButtons = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  const handleClick = async (category) => {
    dispatch(getBlogsInCategory(category));
  };

  useEffect(() => {
    console.log("Blogs:", blogs);
  }, [blogs]);

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.blogButton}
        onClick={() => handleClick("nature")}
      >
        Nature
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
