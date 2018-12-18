// import "./debug.css";

import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "app/App";
import registerServiceWorker from "registerServiceWorker";
import { objectToArrayWithKeys } from 'utilities';
import { ScrollToTop } from "components";
import Amplify, { Auth, Analytics } from 'aws-amplify';
import { awsconfigs } from './keys';
Amplify.configure({ ...awsconfigs });
class AppWithRouter extends React.Component {
    state = {
        isAuthenticated: false,
        loading: true,
        name: '',
        family_name: '',
        userAttributes: [],
    };
    async componentDidMount() {
        let isAuthenticated = false, user;
        try {
            user = await Auth.currentUserInfo();
        } catch (e) {
            console.log('[Initial User Validation]', e);
            Analytics.record({
                name: 'Error',
                attributes: {
                    message: e.message,
                    object: JSON.stringify(e),
                    location: 'Initial User Validation @ Root'
                }
            });
        } finally {
            isAuthenticated = Boolean(user);
            if (user && user.attributes) {
                const { name, family_name } = user.attributes;
                this.setState({
                    name,
                    family_name,
                    userAttributes: [
                        { key: 'username', value: user.username },
                        ...objectToArrayWithKeys(user.attributes)
                    ],
                    isAuthenticated,
                    loading: false
                });
            }
        };
    };
    render() {
        console.log(this.state)
        return (
            <Router>
                <ScrollToTop>
                    {
                        this.state.loading
                            ? null
                            : <App {...this.state}
                            />
                    }
                </ScrollToTop>
            </Router>
        )
    };
}
ReactDOM.render(
    <AppWithRouter />,
    document.getElementById("root")
);
registerServiceWorker();
