import styles from "./main.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "src/redux/slices/blogs";
import { selectIsAuthenticated } from "src/redux/slices/auth";

export function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getBlog(id));
        console.log("Successful response data:", response.payload);
        setBlog(response.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [id, dispatch]);

  return (
    <div>
      <h1 className={styles.yourClass}>the happy blog</h1>
      {isAuthenticated && (
        <Link to={`/dashboard/editblog/${id}`} className={styles.link}>
          <button className={styles.blogButton}>Edit</button>
        </Link>
      )}
      {blog && (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={blog.image} alt="Image 1" />
            <h1 className={`${styles.blog} ${styles.myTitle}`}>{blog.title}</h1>
            <p className={`${styles.blog} ${styles.blogText}`}>
              {blog.content}
            </p>
            <div>
              <p>Author: {blog.userId}</p>
              <p>Likes: {blog.likes}</p>
              <p>Views: {blog.views}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
