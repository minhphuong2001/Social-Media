import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function ProtectedRoute(WrappedComponent) {
    function HOC(props) {
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        const authLoading = useSelector(state => state.auth.authLoading);

        if(authLoading) {
            return (
                <div>Loading</div>
            )
        }
        
        if(isAuthenticated) {
            return <WrappedComponent { ...props } />
        } else {
            return <Redirect to='/login' />
        }
    };

    return HOC;
}

export default ProtectedRoute;