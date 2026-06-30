import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserContext from "./UserContext";
import { useBlog } from "./hooks/useBlog";
import { useRef, useContext } from "react";

const App = () => {
  const { user } = useContext(UserContext);

  const refBlogForm = useRef();
  const { blogs, isPending, isError } = useBlog();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  return (
    <div>
      <Notification />
      {user === null ? (
        <>
          <h1>Log in to application</h1>
          <LoginForm />
        </>
      ) : (
        <>
          <h1>Blogs</h1>
          <Logout />
          <br />
          <Togglable buttonLabel="create new blog" ref={refBlogForm}>
            <BlogForm />
          </Togglable>
          <Blogs blogs={blogs} username={user.username} />
        </>
      )}
    </div>
  );
};

export default App;
