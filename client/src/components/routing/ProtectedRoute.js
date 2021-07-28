import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading'

function ProtectedRoute(WrappedComponent) {
    function HOC(props) {
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        const authLoading = useSelector(state => state.auth.authLoading);

        if(authLoading) {
            return (
                <Loading />
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