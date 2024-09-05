import React from "react";
import Footer from "./footer/Footer";
import HeaderLogout from "./header/headerLogout/HeaderLogout";


const SimpleLayout = ({children}) => {

    return (
            <>
            <HeaderLogout />
                {children}
            <Footer/>
            </>
            );
}

export default SimpleLayout;