import React, { useEffect } from "react";
import BlogComponents from "src/components/BlogComponents/BlogComponents";
import styles from "./main.module.scss";

export function EditBlog() {
  useEffect(() => {
    document.title = "EditBlog";
  }, []);

  return (
    <div className={styles.editBlog}>
      <h1 className={styles.yourClass}>Edit blog</h1>
      <BlogComponents />
    </div>
  );
}

export default EditBlog;
