import React from 'react'
import * as Views from 'views';
import { Switch } from "react-router-dom";
import { objectToArrayWithKeys } from 'utilities';
import RouteConfigurator from './Components/RouteConfigurator';
export default class Routes extends React.Component {
    routes = objectToArrayWithKeys(Views, 'name', 'view').map(
        el =>
            RouteConfigurator({
                ...el,
                childProps: { ...this.props }
            })
    );
    render() {
        return (
            <Switch>
                {
                    this.routes
                }
            </Switch>
        );
    };
};