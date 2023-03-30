import React from 'react';
import {Outlet} from 'react-router-dom';
import { Navigate } from  'react-router-dom'
const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    // let auth = {'token': false}
    return (
       isAuthenticated ? <Outlet/> : <Navigate to="/login" />
    )
}

export default ProtectedRoute;
