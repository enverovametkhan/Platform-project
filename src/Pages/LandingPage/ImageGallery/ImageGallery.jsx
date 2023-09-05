import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";
import image1 from "src/Assets/image1.jpg";
import image2 from "src/Assets/image2.jpg";
import image3 from "src/Assets/image3.jpg";
import image4 from "src/Assets/image4.jpg";

function ImageGallery() {
  useEffect(() => {
    document.title = "Image Gallery - The Happy Blog";
  }, []);

  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageContainer}>
        <Link to="/blog">
          <img className={styles.image} src={image1} alt="Image 1" />
        </Link>
        <div className={styles.imageText}>the happy blog</div>
      </div>

      <div className={styles.imageContainer}>
        <img className={styles.image} src={image2} alt="Image 2" />
        <div className={styles.imageText}>the happy blog</div>
      </div>

      <div className={styles.imageContainer}>
        <img className={styles.image} src={image3} alt="Image 3" />
        <div className={styles.imageText}>the happy blog</div>
      </div>

      <div className={styles.imageContainer}>
        <img className={styles.image} src={image4} alt="Image 4" />
        <div className={styles.imageText}>the happy blog</div>
      </div>
    </div>
  );
}

export default ImageGallery;
