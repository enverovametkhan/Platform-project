import styles from "./main.module.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getUserBlogsInCategory } from "src/redux/slices/blogs";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import { useDispatch } from "react-redux";

function MyBlogs() {
  const { userId, category } = useParams();
  const [blogs, setBlog] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          getUserBlogsInCategory({ userId, category })
        );
        setBlog(response.payload);
        console.log(response.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [userId, dispatch]);

  return (
    <div>
      <div className={styles.myContainer}>
        <h1 className={styles.yourClass}>My blogs</h1>
        <BlogButtons />
        <ImageGallery />
        {blogs && (
          <div>
            <h1>{blogs.title}</h1>
            <p>{blogs.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
