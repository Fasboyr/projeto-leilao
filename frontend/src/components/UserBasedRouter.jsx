import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserBasedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    const isAuthorized = token && allowedRoles.includes(userType);

    return isAuthorized ? <Outlet /> : <Navigate to='/unauthorized' />;
};

export default UserBasedRoute;
