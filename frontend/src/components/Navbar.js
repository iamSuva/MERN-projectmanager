import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
const Navbar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({
      user: "",
      token: null,
    });
    localStorage.removeItem("loginUser");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/addProject" className="navbar-link">
              AddProject
            </Link>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout}>Logout</button>
          </li>
          {/* <li className="navbar-item"><a href="/contact" className="navbar-link">Contact</a></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
