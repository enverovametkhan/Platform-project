import styles from "./main.module.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBlogsInCategory } from "src/redux/slices/blogs";
import { selectCurrentUser } from "src/redux/slices/auth";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import { useDispatch, useSelector } from "react-redux";

function MyBlogs() {
  const { userId } = useSelector(selectCurrentUser);
  const [blogs, setBlogs] = useState(null);
  const [category, setCategory] = useState("nature");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId);
        const blogs = await dispatch(
          getUserBlogsInCategory({ userId, category })
        );
        console.log(userId, category);
        setBlogs(blogs.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [category]);

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
