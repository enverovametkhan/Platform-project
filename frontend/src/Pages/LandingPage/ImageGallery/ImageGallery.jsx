import React from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";

const ImageGallery = ({ id, title, likes, image }) => {
  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageContainer}>
        <Link to={`/blog/${id}`}>
          <img className={styles.image} src={image} alt={`Image ${id}`} />

          <p>{title}</p>
          <p>{likes}</p>
        </Link>
        <div className={styles.imageText}>the happy blog</div>
      </div>
    </div>
  );
};

export default ImageGallery;
