import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

const user = localStorage.getItem('email')

  return user ? <Outlet /> : <Navigate to="/" replace />


};

export default PrivateRoute;
