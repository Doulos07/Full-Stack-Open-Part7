import { useContext } from "react";
import UserContext from "../UserContext";

const Logout = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <>
      {`${user.name} ${user.username} logged in`}
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Logout;
