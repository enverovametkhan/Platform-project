import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBlog, blogLikeService } from "src/redux/slices/blogs";
import { selectIsAuthenticated } from "src/redux/slices/auth";
import { RingLoader } from "react-spinners";
import styles from "./main.module.scss";
import { selectCurrentUser } from "src/redux/slices/users";

export function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await dispatch(getBlog(id));
          console.log(response);
          setBlog(response.payload);
          setLoading(false);
        } else {
          console.log("Error: Blog ID is undefined");
        }
      } catch (e) {
        console.log("Error:", e);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleLike = async () => {
    try {
      let response = await dispatch(
        blogLikeService({ blogId: id, userId: currentUser.id })
      );
      console.log(response);
      setBlog((prevBlog) => ({
        ...prevBlog,
        hasUserLikedBlog: !prevBlog.hasUserLikedBlog,
        likes: prevBlog.likes + (prevBlog.hasUserLikedBlog ? -1 : 1),
      }));
    } catch (error) {
      console.error("Error while handling like:", error.message);
    }
  };

  return (
    <div className={styles.centerContainer}>
      <h1 className={styles.yourClass}>the happy blog</h1>
      {isAuthenticated && (
        <Link to={`/dashboard/editblog/${id}`} className={styles.link}>
          <button className={styles.blogButton}>Edit</button>
        </Link>
      )}
      {loading ? (
        <div className={styles.centerLoader}>
          <RingLoader color={"#545f71"} loading={loading} size={150} />
        </div>
      ) : (
        blog && (
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={blog.image} alt="Image 1" />
              <h1 className={`${styles.blog} ${styles.myTitle}`}>
                {blog.title}
              </h1>
              <p className={`${styles.blog} ${styles.blogText}`}>
                {blog.content}
              </p>
              <div className={styles.blogComp}>
                <p>Author: {blog.userId}</p>
                <p>Likes: {blog.likes}</p>
                <p>Views: {blog.views}</p>
                {isAuthenticated && (
                  <button
                    className={`${styles.compButton} ${
                      blog.hasUserLikedBlog ? styles.liked : ""
                    }`}
                    type="button"
                    onClick={handleLike}
                  >
                    <i className="fas fa-thumbs-up"></i>
                    {"Like"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Blog;
