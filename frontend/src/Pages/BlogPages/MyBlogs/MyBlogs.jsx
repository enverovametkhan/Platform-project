import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlogsInCategory } from "src/redux/slices/blogs";
import { selectCurrentUser } from "src/redux/slices/users";

export function MyBlogs() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectCurrentUser);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("nature");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);

        const blogs = await dispatch(
          getUserBlogsInCategory({ userId: id, category })
        );
        console.log(blogs.payload);
        if (Array.isArray(blogs.payload)) {
          setBlogs(blogs.payload);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    fetchData();
  }, [category]);

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

        <div className={styles.imageGalleryContainer}>
          {blogs.map((eachBlog) => (
            <div key={eachBlog.id}>
              <ImageGallery
                key={eachBlog.id}
                id={eachBlog.id}
                title={eachBlog.title}
                likes={eachBlog.likes}
                image={eachBlog.image}
              />
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div>
            <h1>No blogs found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
