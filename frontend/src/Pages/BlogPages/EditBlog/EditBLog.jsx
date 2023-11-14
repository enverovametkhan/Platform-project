import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateBlog, getBlog, deleteBlog } from "src/redux/slices/blogs";
import { selectCurrentUser } from "src/redux/slices/users";
import { useParams } from "react-router";
import { ImageUploader } from "src/components/ImageUploader/ImageUploader";
import styles from "./main.module.scss";

export function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedBlog, setUpdatedBlog] = useState({
    title: "",
    content: "",
    image: "",
    visible: false,
    categories: "nature",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getBlog(id));
        console.log(response);
        if (response.payload.userId !== currentUser.id) {
          navigate("/");
          return;
        }

        setBlog(response.payload);

        setUpdatedBlog({
          title: response.payload.title || "",
          content: response.payload.content || "",
          category: response.payload.category || "nature",
          image: response.payload.image || "",
          visible: response.payload.visible || false,
        });

        console.log(response.payload);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUpdatedBlog({
      ...updatedBlog,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await dispatch(updateBlog({ id, updatedBlog }));
      console.log(response.payload);
      navigate("/dashboard");
    } catch (error) {
      console.error("Update Blog Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteBlog(id));
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Delete Blog Error:", error);
    }
  };

  return (
    <div className={styles.editBlog}>
      <h1 className={styles.h1}>Edit Blog</h1>
      <div className={styles.labelGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={updatedBlog.title}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.labelGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          value={updatedBlog.content}
          rows="8"
          cols="50"
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.toggleVisibilityGroup}>
        <div className={styles.visText}>Visibility</div>
        <div className={styles.pubText}></div>
        <div className={styles.toggleGroup}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              id="visible"
              checked={updatedBlog.visible}
              name="visible"
              onChange={handleInputChange}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <ImageUploader formData={updatedBlog} setFormData={setUpdatedBlog} />

      <div className={styles.labelGroup}>
        <label htmlFor="categories">Categories</label>
        <select
          name="categories"
          value={updatedBlog.categories}
          onChange={handleInputChange}
        >
          <option value="nature">Nature</option>
          <option value="technology">Technology</option>
          <option value="life">Life</option>
        </select>
      </div>
      <div className={styles.savedeleteGroup}>
        <button
          className={`${styles.compButton} ${styles.compButGreen}`}
          type="button"
          onClick={handleUpdate}
        >
          Update Blog
        </button>
        <button
          className={`${styles.compButton} ${styles.compButRed}`}
          type="button"
          onClick={handleDelete}
        >
          Delete Blog
        </button>
      </div>
    </div>
  );
}

export default EditBlog;
