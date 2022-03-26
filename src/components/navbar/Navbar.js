import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <NavLink activeClassName="active__link" to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink activeClassName="active__link" to="/importexcelsheet">
          Import Excel Sheet
        </NavLink>
        <NavLink activeClassName="active__link" to="/sendmessages">
          Send Message
        </NavLink>
        <NavLink to="existingmembers" activeClassName="active__link">
          Existing Users
        </NavLink>
      </div>
      <div className="navbar__right">
        {/* <Link to="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </Link> */}
        <Link to="#!">
          <img width="30" src={avatar} alt="avatar" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
