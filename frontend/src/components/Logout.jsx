import { useContext } from "react";
import UserContext from "../UserContext";

const Logout = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <div>
      {`${user.name} ${user.username} logged in`}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
