import React from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";

const ImageGallery = ({ id, title, likes, image }) => {
  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageContainer}>
        <Link to={`/blog/${id}`} className={styles.linkStyle}>
          <img className={styles.image} src={image} alt={`Image ${id}`} />
          <div className={styles.blogComp}>
            <h1>{title}</h1>

            <p>{likes}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ImageGallery;
