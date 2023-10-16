import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";
import { getBlogsInCategory } from "src/redux/slice";

import image1 from "src/Assets/image1.jpg";
import image2 from "src/Assets/image2.jpg";
import image3 from "src/Assets/image3.jpg";
import image4 from "src/Assets/image4.jpg";

const ImageGallery = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const loadImagesByCategory = async (category) => {
      try {
        let test = await dispatch(getBlogsInCategory(category));
        console.log(test);

        const categoryImages = {
          myblog: [image1, image3, image4],
          technology: [image2, image4, image3],
          life: [image3, image1, image4],
        };

        setFilteredImages(categoryImages[category] || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    loadImagesByCategory(selectedCategory);
  }, [selectedCategory, dispatch]);

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
