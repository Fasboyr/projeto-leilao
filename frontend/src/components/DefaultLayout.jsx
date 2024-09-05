import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/headerLogin/Header";

const DefaultLayout = ({ children }) =>{

        return(
            <>
                <Header/>
                
                    {children}
                <Footer/>
            </>
        );
}

export default DefaultLayout;