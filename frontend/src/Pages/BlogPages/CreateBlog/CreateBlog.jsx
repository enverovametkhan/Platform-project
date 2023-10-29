import React, { useEffect } from "react";
import BlogComponents from "src/components/BlogComponents/BlogComponents";

import styles from "./main.module.scss";

export function CreateBlog() {
  useEffect(() => {
    document.title = "CreateBlog";
  }, []);

  return (
    <div className={styles.createBlog}>
      <h1 className={styles.yourClass}>Create blog</h1>

      <BlogComponents />
    </div>
  );
}

export default CreateBlog;
