import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import BlogButtons from "src/components/BlogButtons/BlogButtons";
import ImageGallery from "src/Pages/LandingPage/ImageGallery/ImageGallery";
import AuthButtons from "src/components/AuthButtons/AuthButtons";
import Footer from "src/Pages/LandingPage/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getBlogsInCategory,
  setCurrentCategory,
  selectCurrentCategory,
} from "src/redux/slices/blogs";

function LandingPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const globalCategory = useSelector(selectCurrentCategory);
  const [category, setCategory] = useState("nature");
  const [blogs, setBlogs] = useState([]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let blogs = await dispatch(getBlogsInCategory(category));
        await dispatch(setCurrentCategory(category));
        setBlogs(blogs.payload);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log(category);
  }, [category, dispatch]);

  useEffect(() => {
    console.log(blogs);
    console.log(location);
  }, [blogs]);

  return (
    <div className={styles.landingPage}>
      <AuthButtons />
      <h1 className={styles.yourClass}>the happy blog</h1>
      <BlogButtons
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      {Array.isArray(blogs) ? (
        blogs.map((eachBlog) => (
          <ImageGallery
            key={eachBlog.id}
            id={eachBlog.id}
            title={eachBlog.title}
            likes={eachBlog.likes}
          />
        ))
      ) }

      <Footer />
    </div>
  );
}

export default LandingPage;
