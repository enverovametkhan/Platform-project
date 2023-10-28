import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlogsInCategory } from "src/redux/slices/blogs";

function MyBlogs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs.userBlogsInCategory);
  const [category, setCategory] = useState("nature");

  useEffect(() => {
    if (user && user.currentUser) {
      const { id } = user.currentUser;
      dispatch(getUserBlogsInCategory({ id, category }));
    }
  }, [category, dispatch, user]);

  return (
    <div>
      <div className={styles.myContainer}>
        <h1 className={styles.yourClass}>My blogs</h1>

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

        {blogs.length > 0 ? (
          blogs.map((eachBlog) => (
            <div key={eachBlog.id}>
              <ImageGallery
                key={eachBlog.id}
                id={eachBlog.id}
                title={eachBlog.title}
                likes={eachBlog.likes}
                image={eachBlog.image}
              />
              <div>
                <h1>{eachBlog.title}</h1>
                <p>{eachBlog.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>No blogs found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
