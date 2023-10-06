import React, { useEffect } from "react";
import styles from "./main.module.scss";

const PageNotFound = () => {
  useEffect(() => {
    console.log("PageNotFound component mounted");

    return () => {
      console.log("PageNotFound component unmounted");
    };
  }, []);

  return (
    <div className={styles["page-not-found"]}>
      <h2 className={styles["error-title"]}>404 - Page Not Found</h2>
      <p className={styles["error-message"]}>
        The requested page does not exist.
      </p>
    </div>
  );
};

export default PageNotFound;
