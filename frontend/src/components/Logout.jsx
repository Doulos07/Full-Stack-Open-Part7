import { useContext } from "react";
import UserContext from "../UserContext";

const Logout = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <p>{`${user.name} ${user.username} logged in`}</p>
      <button className="button-nav" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
