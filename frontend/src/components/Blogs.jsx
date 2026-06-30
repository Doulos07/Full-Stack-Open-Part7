import Blog from "./Blog";

const Blogs = ({ blogs, username }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id} className="blog">
            <Blog key={blog.id} blog={blog} username={username} />
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
