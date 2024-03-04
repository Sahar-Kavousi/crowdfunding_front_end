import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/use-auth.js"; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth.token) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
