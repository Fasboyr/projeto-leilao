import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRouter = () => {

    const isAuthenticated = localStorage.getItem("token")?true:false;
    //const isAuthenticated = !!localStorage.getItem("token");

    return(isAuthenticated?<Outlet/>:<Navigate to='/unauthorized'/>);
}

export default PrivateRouter;