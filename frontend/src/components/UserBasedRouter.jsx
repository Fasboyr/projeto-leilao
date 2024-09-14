import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserBasedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    // Verifica se o token existe e se o tipo de usuário está na lista de permissões
    const isAuthorized = token && allowedRoles.includes(userType);

    return isAuthorized ? <Outlet /> : <Navigate to='/' />;
};

export default UserBasedRoute;
