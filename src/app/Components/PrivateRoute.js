import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ?
                <Component {...props} isAuthenticated={isAuthenticated} /> :
                <Redirect to={{ pathname: "/sign-in" }} />
        }
    />
);
export default PrivateRoute;