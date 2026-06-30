import "../styles/blog.css";
import { useBlog } from "../hooks/useBlog";
import { useParams } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";
const Blog = () => {
  const { user } = useContext(UserContext);
  const blogId = useParams().id;
  const { blogs, isPending, isError, voteBlog, removeBlog } = useBlog();

  if (isPending) return <div>loading...</div>;
  if (isError) return <div>blogs service not available due to problems in server</div>;

  const blog = blogs.find((blog) => blog.id === blogId);
  if (!blog) return <div>blog does not exist.</div>;

  const handleLike = () => {
    voteBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id });
  };

  const handleDelete = () => {
    if (globalThis.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div className="blogDetail">
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <p>
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>added by: {blog.user.username}</p>
        {user.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
