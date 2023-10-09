import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsInCategory } from "src/redux/slice";
import styles from "./main.module.scss";

const BlogButtons = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  const handleClick = async (category) => {
    const state = { ...blogs };
    state.currentCategory = category;
    dispatch(getBlogsInCategory(category));
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
