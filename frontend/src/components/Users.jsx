import { useUsers } from "../hooks/useUser";
import { Link } from "react-router-dom";
const Users = () => {
  const { users, isPending, isError } = useUsers();

  if (isPending) return <div>loading...</div>;
  if (isError) return <div>anecdote service not available due to problems in server</div>;

  console.log(users);
  return (
    <>
      <h2>Users</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>user</th>
              <th>blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name} {user.username}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
