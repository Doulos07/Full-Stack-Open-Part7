import "../styles/HeaderNav.css";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div className="ContainerNav">
      <nav style={{ display: "inline-block", marginRight: "10px" }}>
        <Link to="/">blogs</Link> <Link to="/users">users</Link>
      </nav>
      <Logout />
    </div>
  );
};

export default HeaderNav;
