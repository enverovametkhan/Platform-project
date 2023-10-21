import styles from "./main.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import getBlog from "src/redux/slices/blogs";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "My Blog";

    const fetchData = async () => {
      try {
        const response = await dispatch(getBlog(id));
        setBlog(response.payload);
        console.log(response.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [id, dispatch]);

  return (
    <div>
      <h1 className={styles.yourClass}>the happy blog</h1>
      {blog && (
        <Link to="/dashboard/editblog" className={styles.link}>
          <button className={styles.blogButton}>Edit</button>
        </Link>
      )}
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={blog && blog.image}
            alt="Image 1"
          />
          <h1 className={`${styles.blog} ${styles.myTitle}`}>My blog</h1>
          <p className={`${styles.blog} ${styles.blogText}`}>
            Let me introduce myself. My name is Ann. I am twenty. I am a
            student. I study at the university. I am a prospective economist. I
            like this profession, that's why I study with pleasure. My parents
            are not economists, but they support me in my choice. We are a
            friendly family and try to understand and support each other in any
            situation. Understanding and support is what I need in friendship as
            well. Some of my friends study at the same university. After classes
            we usually gather together, discuss our plans or problems, and have
            some fun. We have a lot of hobbies. Sometimes we go to the disco,
            sometimes organize a picnic in the open air, play sports, or watch a
            nice film. One of my hobbies is cooking. So when my friends come to
            my house, I bake their favorite apple pie. I also like reading. One
            of my favorite authors is Chekhov. I like his books because I can
            analyze the characters, their way of life, and find answers to my
            questions. My friends also like reading. We sometimes discuss our
            favorite authors, their books, the style of their writing, and ideas
            depicted in their books. I like making new friends, so if you like,
            you may become my friend as well.
          </p>
          {blog &&
            blog.comments &&
            blog.comments[0] !== null &&
            blog.comments.map((comment) => (
              <div key={comment.id} className={styles.comments}>
                <h3>Comments</h3>
                <p>{comment.content}</p>
                <p>{comment.userId}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
