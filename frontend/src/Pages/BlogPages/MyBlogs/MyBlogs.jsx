import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlogsInCategory } from "src/redux/slices/blogs";
import { selectCurrentUser } from "src/redux/slices/users";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export function MyBlogs() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectCurrentUser);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("life");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const blogs = await dispatch(
          getUserBlogsInCategory({ userId: id, category })
        );
        console.log(blogs.payload);
        if (Array.isArray(blogs.payload)) {
          setBlogs(blogs.payload);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, id]);

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

        {loading ? (
          <div className={styles.loaderContainer}>
            <BeatLoader color="#666" size={20} />
          </div>
        ) : (
          <>
            <div className={styles.imageGalleryContainer}>
              {blogs.map((eachBlog) => (
                <div key={eachBlog._id} className={styles.imageGallery}>
                  <div className={styles.imageContainer}>
                    <Link
                      to={`/blog/${eachBlog._id}`}
                      className={styles.linkStyle}
                    >
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

            {blogs.length === 0 && (
              <div>
                <h1 className={styles.noClass}>No blogs found</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
