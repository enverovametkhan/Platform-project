import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "src/redux/slices/blogs";
import { useNavigate } from "react-router-dom";

export function CreateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: "",
    category: "nature",
    visible: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setNewBlog({ ...newBlog, [name]: file });
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(createBlog(newBlog));

      console.log("Blog created:", response);
      navigate(`/blog/${response.payload.id}`);
    } catch (error) {
      console.error("Create Blog Error:", error);
    }
  };

  return (
    <div className="create-blog">
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            value={newBlog.content}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="visible">Visible</label>
          <input
            type="checkbox"
            name="visible"
            checked={newBlog.visible}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={newBlog.category}
            onChange={handleInputChange}
          >
            <option value="nature">Nature</option>
            <option value="technology">Technology</option>
            <option value="life">Life</option>
          </select>
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
