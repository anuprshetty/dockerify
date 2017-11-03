import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { APP_URL } from "./config";

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to={`${APP_URL}/`}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to={`${APP_URL}/thankyou/`}>Thank You</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
