import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRouteElement;
