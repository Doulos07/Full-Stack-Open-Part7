import { Routes, Route } from "react-router-dom";
import { useBlog } from "./hooks/useBlog";
import { useRef, useContext } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import UserContext from "./UserContext";
import Blog from "./components/Blog";
import HeaderNav from "./components/HeaderNav";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

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
      <HeaderNav />
      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="create new blog" ref={refBlogForm}>
                  <BlogForm />
                </Togglable>
                <Blogs blogs={blogs} />
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
