import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../Context/AuthContext';
 
const RequireAuth = () => {
  const location = useLocation();
  const auth =useAuth();

  // If no token is found, redirect to the login page
  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  // If token exists, allow access to the protected route
  return <Outlet />;
};

export default RequireAuth;
