import { useState, useEffect, useRef, useContext } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NotificationContext from "./NotificationContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { notify } = useContext(NotificationContext);
  const refBlogForm = useRef();

  const sortLikes = (a, b) => b.likes - a.likes;

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort(sortLikes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const logged = globalThis.localStorage.getItem("logged");
    if (logged) {
      const user = JSON.parse(logged);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    loginService
      .login(username, password)
      .then((user) => {
        globalThis.localStorage.setItem("logged", JSON.stringify(user));
        blogService.setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        notify({
          message: error.response.data.error,
          type: "error",
        });
      });
  };

  const handleLogged = () => {
    globalThis.localStorage.removeItem("logged");
    setUser(null);
  };

  const handleLike = (blog) => {
    const updateBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    blogService.update(updateBlog).then((updateBlog) => {
      setBlogs(
        blogs
          .map((blog) =>
            blog.id === updateBlog.id
              ? (blog = { ...blog, likes: updateBlog.likes })
              : blog,
          )
          .sort(sortLikes),
      );
    });
  };

  const deleteBlog = (deleteBlog) => {
    //console.log("hola", blogData);

    const confirmDelete = globalThis.confirm(
      `remove blog ${deleteBlog.title} by ${deleteBlog.author}`,
    );
    if (confirmDelete) {
      blogService.remove(deleteBlog.id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== deleteBlog.id));
      });
    }
  };

  const newBlog = (blogData) => {
    blogService
      .create(blogData)
      .then((newBlog) => {
        setBlogs(blogs.concat(newBlog));
        refBlogForm.current.toggleVisibile();
        notify({
          message: `a new blog ${newBlog.title} by ${newBlog.author}`,
          type: "success",
        });
      })
      .catch((error) => {
        notify({
          message: error.response.data.error,
          type: "error",
        });
      });
  };

  return (
    <div>
      {user === null ? (
        <>
          <h1>Log in to application</h1>
          <Notification />
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handle={handleLogin}
          />
        </>
      ) : (
        <>
          <h1>Blogs</h1>
          <Notification />
          <Logout handleClick={handleLogged} user={user} />
          <br />
          <Togglable buttonLabel="create new blog" ref={refBlogForm}>
            <BlogForm newBlog={newBlog} />
          </Togglable>
          <Blogs
            blogs={blogs}
            username={user.username}
            handleLike={handleLike}
            handleDelete={deleteBlog}
          />
        </>
      )}
    </div>
  );
};

export default App;
