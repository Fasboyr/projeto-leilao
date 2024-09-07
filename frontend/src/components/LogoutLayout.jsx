import React from "react";
import Footer from "./footer/Footer";
import HeaderLogout from "./header/headerLogout/HeaderLogout";


const LogoutLayout = ({children}) => {

    return (
            <div className="background">
            <HeaderLogout />
                {children}
            <Footer/>
            </div>
            );
}

export default LogoutLayout;