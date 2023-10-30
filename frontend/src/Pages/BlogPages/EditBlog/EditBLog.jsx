import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateBlog, getBlog } from "src/redux/slices/blogs";
import { selectCurrentUser } from "src/redux/slices/users";
import { useParams } from "react-router";

export function EditBlog() {
  const { id } = useSelector(selectCurrentUser);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateBlog({ id, updatedBlog }));
      console.log(response);
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
