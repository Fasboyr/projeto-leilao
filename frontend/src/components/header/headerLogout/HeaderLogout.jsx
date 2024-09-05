import React from "react";
import { Link } from "react-router-dom";
import "./HeaderLogout.module.css";

const HeaderLogout = () => {
    return (
        <div className="header">
            <h2>Menu</h2>
            <nav className="nav-left">
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/recover">Recupear Senha</Link></li>
                    <li><Link to="/register">Cadastrar-se</Link></li>
                </ul>
            </nav>
            <nav className="nav-right">
                <ul>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default HeaderLogout;
