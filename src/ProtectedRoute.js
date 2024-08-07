import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('isAuthenticated');

  if (isAuthenticated !== 'true') {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
