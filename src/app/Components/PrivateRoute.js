import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, childProps, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            childProps.isAuthenticated ?
                <Component {...props} childProps={childProps} /> :
                <Redirect to={{ pathname: "/sign-in" }} />
        }
    />
);
export default PrivateRoute;