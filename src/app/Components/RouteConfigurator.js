import React from 'react';
import { pascalToKebab, splitOnUnderscore, collapse } from 'utilities';
import { Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
export default ({ name, view, isAuthenticated }) => {
    const config = {
        name: splitOnUnderscore(name).pop(),
        component: view,
        privateRoute: false,
        parents: collapse(splitOnUnderscore(name).reverse().slice(1), ['']),
        params: [''],
        path: name === 'Home' ? '/' : false,
        exact: Boolean(name === 'Home' || !collapse(splitOnUnderscore(name).reverse().slice(1), ['']).length),
    };
    const configsFromView = view.routeConfigs ? view.routeConfigs() : false;
    if (configsFromView) {
        const { parent, parents, path, params, privateRoute, component, name, exact } = configsFromView;
        if (parents) config.parents = parents;
        if (parent) config.parents.unshift(parent);
        if (path) config.path = path;
        if (params) config.params = config.params.concat(params);
        if (privateRoute) config.privateRoute = true;
        if (component) config.component = component;
        if (name) config.name = name;
        if (exact !== undefined) config.exact = exact;
    };
    const getPropsOnConfig = ({ name, component, parents, params, path, exact }) => ({
        path: path ? path : (
            '/'
            + [...parents, name].map(el => pascalToKebab(el)).join('/')
            + params.join('/:')
        ),
        key: [...parents, name].map(el => pascalToKebab(el)).join('/'),
        isAuthenticated,
        component,
        exact,
    });
    const props = getPropsOnConfig(config);
    console.log(config.name.toUpperCase(), { props });
    if (config.name === 'NotFound') return <Route key='not-found' component={view} />
    if (config.privateRoute) return <PrivateRoute {...props} />;
    if (!config.privateRoute) return <Route {...props} />;
};
/* EXAMPLE RETURN
    <PrivateRoute
        isAuthenticated={this.props.isAuthenticated}
        path='/account'
        key={pascalToKebab('Account')}
        component={Views['Account']}
    />
    <Route
        path='/sign-in'
        key={pascalToKebab('SignIn')}
        component={Views['SignIn']}
    />








                <Route
                    isAuthenticated={this.props.isAuthenticated}
                    exact
                    path='/'
                    key={pascalToKebab('Home')}
                    component={Views['Home']}
                />


                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/groups/group/:id'
                    key={pascalToKebab('Group')}
                    component={Views['Group']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/groups/add-students/:id'
                    key={pascalToKebab('AddStudents')}
                    component={Views['AddStudents']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/groups/new-group'
                    key={pascalToKebab('NewGroup')}
                    component={Views['NewGroup']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/groups'
                    key={pascalToKebab('Groups')}
                    component={Views['Groups']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/tests/new-test'
                    key={pascalToKebab('NewTest')}
                    component={Views['NewTest']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/tests/test/:id'
                    key={pascalToKebab('Test')}
                    component={Views['Test']}
                />


                <Route
                    path='/tests/generate-pdf/:data/:platform'
                    key={pascalToKebab('GeneratePdf')}
                    component={Views['GeneratePdf']}
                />
                      
                      
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/tests/apply-test/:id'
                    key={pascalToKebab('ApplyTest')}
                    component={Views['ApplyTest']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/tests'
                    key={pascalToKebab('Tests')}
                    component={Views['Tests']}
                />
                <PrivateRoute
                    isAuthenticated={this.props.isAuthenticated}
                    path='/account'
                    key={pascalToKebab('Account')}
                    component={Views['Account']}
                />


                <Route
                    path='/sign-in'
                    key={pascalToKebab('SignIn')}
                    component={Views['SignIn']}
                />
                <Route
                    path='/sign-up'
                    key={pascalToKebab('SignUp')}
                    component={Views['SignUp']}
                />
                <Route
                    path='/forgot-password'
                    key={pascalToKebab('ForgotPassword')}
                    component={Views['ForgotPassword']}
                />


                <Route
                    key={pascalToKebab('NotFound')}
                    component={Views['NotFound']}
                />
*/