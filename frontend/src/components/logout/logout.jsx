import { Button } from "primereact/button";
import React from "react";
import {useNavigate} from "react-router-dom";

const Logout = () =>{
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/")
    }
    
    return (
        <a href="/" onClick={(e) => {
          e.preventDefault(); 
          logout();
        }} style={{color: 'var(--text-color)', textDecoration: 'none' }}>
          Logout
        </a>
      );
}

export default Logout;