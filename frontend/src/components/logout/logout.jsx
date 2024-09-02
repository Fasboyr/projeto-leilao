import { Button } from "primereact/button";
import React from "react";
import {useNavigate} from "react-router-dom";

const Logout = () =>{
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login")
    }
    
    return (
        <a href="/login" onClick={(e) => {
          e.preventDefault(); // Impede o comportamento padrão do link
          logout();
        }} style={{ color: 'white', textDecoration: 'none' }}>
          Logout
        </a>
      );
}

export default Logout;