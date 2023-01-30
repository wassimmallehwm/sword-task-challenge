import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@contexts/auth/AuthContext';

const GuestRoute = ({children}: any) => {
    const {user} = useContext(AuthContext);

    if (user) {
        return <Navigate to="/" replace />;
    }
    
    return children;
}

export default GuestRoute;