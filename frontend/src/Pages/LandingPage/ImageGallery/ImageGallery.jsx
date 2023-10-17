import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import image1 from "src/Assets/image1.jpg";
import image2 from "src/Assets/image2.jpg";
import image3 from "src/Assets/image3.jpg";
import image4 from "src/Assets/image4.jpg";

const categoryImages = {
  myblog: [image1, image3, image4],
  technology: [image2, image4, image3],
  life: [image3, image1, image4],
};

const ImageGallery = ({ selectedCategory }) => {
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const images = categoryImages[selectedCategory] || [];
    setFilteredImages(images);
  }, [selectedCategory]);

  return (
    <div className={styles.imageGallery}>
      {filteredImages.map((image, index) => (
        <div className={styles.imageContainer} key={index}>
          <Link to="/blog">
            <img
              className={styles.image}
              src={image}
              alt={`Image ${index + 1}`}
            />
          </Link>
          <div className={styles.imageText}>the happy blog</div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
