import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/headerLogin/Header";


const SimpleLayout = ({ children }) => {

    return (
        <div className="background">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default SimpleLayout;