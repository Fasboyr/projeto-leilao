import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/headerLogin/Header";
import HeaderLogout from "./header/headerLogout/HeaderLogout";

const DefaultLayout = ({ children }) => {
    // Verificar se o usuário está autenticado
    const isAuthenticated = localStorage.getItem("token") ? true : false;

    return (
        <div className="background">
            {isAuthenticated ? <Header /> : <HeaderLogout />}
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;