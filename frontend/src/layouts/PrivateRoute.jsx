import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('authToken');

    // If the token exists, render the child routes (Outlet)
    // Otherwise, redirect to the login page
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;