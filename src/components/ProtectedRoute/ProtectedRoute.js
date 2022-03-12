import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children, ...props }) => {

    const location = useLocation();

    if (!loggedIn) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    
    return children;
}

export default ProtectedRoute; 