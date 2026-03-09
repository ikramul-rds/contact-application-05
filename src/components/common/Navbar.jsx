import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav_container">
        <Link to="/" className="logo">
          Contact Application
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
