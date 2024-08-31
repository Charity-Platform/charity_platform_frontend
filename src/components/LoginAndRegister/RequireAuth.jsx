import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const RequireAuth = () => {
    const token = Cookies.get("token");
    const location = useLocation();

    // Check if the token exists and is valid
    if (!token) {
        // If no token is found, navigate to the login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Assuming your token contains user information or you have another way to verify the user
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (!user) {
        // If no user data is found, navigate to the login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If token and user exist, allow access to the protected route
    return <Outlet />;
};

export default RequireAuth;
