import { useUsers } from "../hooks/useUser";

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
                  {user.name} {user.username}
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
