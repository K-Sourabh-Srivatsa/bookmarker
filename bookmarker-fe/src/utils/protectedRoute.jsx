import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ children }) {
    const token = sessionStorage.getItem('token');

    if(!token) return <Navigate to='/user/login' replace />

    return children;
}

export default ProtectedRoute;