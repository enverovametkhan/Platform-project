import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "src/redux/slices/blogs";

import { selectCurrentUser } from "src/redux/slices/users";

export function EditBlog() {
  const { id } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [updatedBlog, setUpdatedBlog] = useState({
    title: "",
    content: "",
    image: "",
    visible: false,
    categories: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBlog({ ...updatedBlog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateBlog({ id, updatedBlog }));

      if (updateBlog.fulfilled.match(response)) {
        console.log("Blog updated:", response);
      } else if (updateBlog.rejected.match(response)) {
        const error = response.payload;
        console.error("Blog update error:", error);
      }
    } catch (error) {
      console.error("Update Blog Error:", error);
    }
  };

  return (
    <div className="edit-blog">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={updatedBlog.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            value={updatedBlog.content}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            value={updatedBlog.image}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="visible">Visible</label>
          <input
            type="checkbox"
            name="visible"
            checked={updatedBlog.visible}
            onChange={handleInputChange}
          />
        </div>

        <div>
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

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
