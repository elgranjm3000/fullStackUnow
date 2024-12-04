import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); 
  console.log(token)
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;