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
import { useBlog } from "./hooks/useBlog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { notify } = useContext(NotificationContext);
  const refBlogForm = useRef();
  const { blogs, isPending, isError } = useBlog();
  console.log("blogs", blogs);

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
            blog.id === updateBlog.id ? (blog = { ...blog, likes: updateBlog.likes }) : blog,
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

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
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
            <BlogForm />
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
