import Logout from "./Logout";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  const styleNav = {
    backgroundColor: "#d3d3d3",
  };

  return (
    <div style={styleNav}>
      <nav style={{ display: "inline-block", marginRight: "10px" }}>
        <Link to="/">blogs</Link> <Link to="/users">users</Link>
      </nav>
      <Logout />
    </div>
  );
};

export default HeaderNav;
