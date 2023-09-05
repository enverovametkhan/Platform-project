import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";
import max from "src/Assets/max.jpeg";

function ReccuringPage() {
  useEffect(() => {
    document.title = "My blogs";
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.yourClass}>the happy blog</h1>
      <img className={styles.image} src={max} alt="Image" />

      <div className={styles.buttonsPage}>
        <Link to="/create" className={styles.link}>
          <button className={styles.pageButton}>Create blog</button>
        </Link>
        <div className={styles.myLinks}>
          <div className={styles.myBlogs}>
            <Link to="/blogs">Blogs</Link>
          </div>
          <div className={styles.myAccount}>
            <Link to="/account">Account</Link>
          </div>
        </div>
        <Link to="/login" className={styles.link}>
          <button className={`${styles.pageButton} ${styles.logoutButton}`}>
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ReccuringPage;
