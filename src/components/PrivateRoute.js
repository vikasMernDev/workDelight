import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ path, element: Element, isAuthenticated, ...props }) => {

const user = localStorage.getItem('email')
console.log("564546",user)

  return user ? <Outlet /> : <Navigate to="/" replace />


};

export default PrivateRoute;
