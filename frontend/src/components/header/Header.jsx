import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logout from "../logout/logout";

const Header = () => {
  return (
    <div className="header">
      <h2>Menu</h2>
      <nav className="nav-left">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/change">Mudar Senha</Link></li>
        </ul>
      </nav>
      <nav className="nav-right">
        <ul>
          <li><Link to="/recover"><i className="fas fa-user"></i></Link></li>
          <li><Logout/></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
