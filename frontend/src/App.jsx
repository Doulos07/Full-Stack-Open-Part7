import { Routes, Route, Link } from "react-router-dom";
import { useBlog } from "./hooks/useBlog";
import { useRef, useContext } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import UserContext from "./UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const refBlogForm = useRef();
  const { blogs, isPending, isError } = useBlog();

  if (isPending) return <div>loading...</div>;
  if (isError) return <div>anecdote service not available due to problems in server</div>;

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <nav>
        <Link to="/">blogs</Link> | <Link to="/users">users</Link>
      </nav>
      <h1>Blogs</h1>
      <Notification />
      <Logout />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new blog" ref={refBlogForm}>
                <BlogForm />
              </Togglable>
              <Blogs blogs={blogs} username={user.username} />
            </>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
