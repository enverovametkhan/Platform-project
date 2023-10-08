import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { getImagesByCategory } from "src/axios/api";
import image1 from "src/Assets/image1.jpg";
import image2 from "src/Assets/image2.jpg";
import image3 from "src/Assets/image3.jpg";
import image4 from "src/Assets/image4.jpg";
import { selectCategory } from "src/redux/imageSlice";

const ImageGallery = () => {
  const selectedCategory = useSelector(selectCategory);

  const filteredImages = () => {
    switch (selectedCategory) {
      case "myblog":
        return [image1, image3, image4];
      case "technology":
        return [image2, image4, image3];
      case "life":
        return [image3, image1, image4];
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const images = await getImagesByCategory(selectedCategory);
        console.log(images);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();

    document.title = "Image Gallery - The Happy Blog";
  }, [selectedCategory]);

  return (
    <div className={styles.imageGallery}>
      {filteredImages().map((image, index) => (
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
