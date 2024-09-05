import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/headerLogin/Header";


const SimpleLayout = ({children}) => {

    return (
            <>
            <Header />
                {children}
            <Footer/>
            </>
            );
}

export default SimpleLayout;