import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";
import { selectCategory } from "src/redux/imageSlice";
import image1 from "src/Assets/image1.jpg";
import image2 from "src/Assets/image2.jpg";
import image3 from "src/Assets/image3.jpg";
import image4 from "src/Assets/image4.jpg";

const ImageGallery = () => {
  const selectedCategory = useSelector(selectCategory);

  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const loadImagesByCategory = async (category) => {
      try {
        const response = await axios.get(`/public/blog/category/${category}`);
        const images = response.data;
        setFilteredImages(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    switch (selectedCategory) {
      case "myblog":
        setFilteredImages([image1, image3, image4]);
        break;
      case "technology":
        setFilteredImages([image2, image4, image3]);
        break;
      case "life":
        setFilteredImages([image3, image1, image4]);
        break;
      default:
        break;
    }
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
