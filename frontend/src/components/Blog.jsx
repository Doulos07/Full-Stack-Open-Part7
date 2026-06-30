import "../styles/blog.css";
import { useState } from "react";
import { useBlog } from "../hooks/useBlog";

const Blog = ({ blog, username }) => {
  const { voteBlog, removeBlog } = useBlog();
  const [visibile, setVisibile] = useState(false);

  const visibileDetail = { display: visibile ? "" : "none" };

  const handleLike = (blog) => {
    const updateBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    voteBlog(updateBlog);
  };

  const handleDelete = (deleteBlog) => {
    const confirmDelete = globalThis.confirm(
      `remove blog ${deleteBlog.title} by ${deleteBlog.author}`,
    );

    if (confirmDelete) removeBlog(deleteBlog.id);
  };
  return (
    <div className="blogDetail">
      {blog.title} {blog.author}
      <button onClick={() => setVisibile(!visibile)}>{visibile ? "hide" : "view"}</button>
      <div style={visibileDetail}>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <p>
          likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>author: {blog.user.username}</p>
        {username === blog.user.username && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
