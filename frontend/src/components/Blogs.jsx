import "../styles/blog.css";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`}>
              <h3>{blog.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
