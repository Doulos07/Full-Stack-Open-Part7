import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUser";
import { Link } from "react-router-dom";

const User = () => {
  const userId = useParams().id;
  const { users, isPending, isError } = useUsers();

  if (isPending) return <div>loading...</div>;
  if (isError) return <div>anecdote service not available due to problems in server</div>;

  console.log(userId);

  const user = users.find((user) => user.id === userId);
  console.log(user);
  if (!user) return <div>User does not exist.</div>;

  return (
    <div>
      <h2>
        {user.name} {user.username}
      </h2>
      <h3>Added blogs</h3>
      {user.blogs.map((blog) => (
        <ul key={blog.id}>
          <li>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default User;
