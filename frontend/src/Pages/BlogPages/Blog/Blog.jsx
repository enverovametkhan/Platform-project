import styles from "./main.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import image1 from "src/Assets/image1.jpg";
import { getBlog, selectCurrentCategory } from "src/redux/slices/blogs";

function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const category = useSelector(selectCurrentCategory);

  useEffect(() => {
    document.title = "My Blog";

    const fetchData = async () => {
      try {
        const response = await dispatch(getBlog(id));
        setBlogs(response.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div className={styles.container}>
      <h1 className={styles.yourClass}>the happy blog</h1>

      <Link to="/dashboard/editblog" className={styles.link}>
        <button className={styles.blogButton}>Edit</button>
      </Link>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image1} alt="Image 1" />
          <h1 className={styles.myTitle}>My blog</h1>
          <p className={styles.blogText}>
            Let me introduce myself. My name is Ann. I am twenty. I am a
            student. I study at the university. I am a prospective economist. I
            like this profession, that's why I study with pleasure. My parents
            are not economists, but they support me in my choice. We are a
            friendly family and try to understand and support each other in any
            situation. Understanding and support is what I need in friendship as
            well. Some of my friends study at the same university. After classes
            we usually gather to­gether, discuss our plans or problems and have
            some fun. We have a lot of hobbies. Sometimes we go to the disco,
            sometimes organize a picnic in the open air, play sports or watch a
            nice film. One of my hobbies is cooking. So when my friends come to
            my house, I bake their favourite apple pie. I also like reading. One
            of my favourite authors is Chekhov. I like his books, because I can
            analyze the characters, their way of life and find answers to my
            questions. My friends also like reading. We sometimes discuss our
            favourite authors, their books, the style of their writing and ideas
            depicted in their books. I like making new friends, so, if you like,
            you may become my friend as well.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
