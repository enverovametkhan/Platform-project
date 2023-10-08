// import React, { useState, useEffect } from "react";
// import styles from "./main.module.scss";

// const BlogButtons = () => {
//   const [section, setSection] = useState("");

//   const handleClick = (section) => {
//     setSection(section);
//     console.log(`Navigating to ${section} section`);
//   };

//   useEffect(() => {
//     console.log(`Current section: ${section}`);
//   }, [section]);

//   return (
//     <div className={styles.buttonContainer}>
//       <button
//         className={styles.blogButton}
//         onClick={() => handleClick("myblog")}
//       >
//         My blog
//       </button>
//       <button
//         className={styles.blogButton}
//         onClick={() => handleClick("technology")}
//       >
//         Technology
//       </button>
//       <button
//         className={`${styles.blogButton} ${styles["life-button"]}`}
//         onClick={() => handleClick("life")}
//       >
//         Life
//       </button>
//     </div>
//   );
// };

// export default BlogButtons;

// src/components/BlogButtons.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "src/redux/imageSlice";
import styles from "./main.module.scss";

const BlogButtons = () => {
  const dispatch = useDispatch();

  const handleClick = (category) => {
    dispatch(setCategory(category));
    console.log(`Navigating to ${category} section`);
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.blogButton}
        onClick={() => handleClick("myblog")}
      >
        My blog
      </button>
      <button
        className={styles.blogButton}
        onClick={() => handleClick("technology")}
      >
        Technology
      </button>
      <button
        className={`${styles.blogButton} ${styles["life-button"]}`}
        onClick={() => handleClick("life")}
      >
        Life
      </button>
    </div>
  );
};

export default BlogButtons;
