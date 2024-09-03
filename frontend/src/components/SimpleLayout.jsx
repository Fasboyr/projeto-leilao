import React from "react";
import Header from "./header/Header";


const SimpleLayout = ({children}) => {

    return (
            <>
            <Header />
                {children}
              
            </>
            );
}

export default SimpleLayout;