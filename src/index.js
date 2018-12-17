// import "./debug.css";

import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "app/App";
import registerServiceWorker from "registerServiceWorker";
import { ScrollToTop } from "components";
import Amplify, { Auth, Analytics } from 'aws-amplify';
import { awsconfigs } from './keys';
Amplify.configure({ ...awsconfigs });
class AppWithRouter extends React.Component {
    state = { isAuthenticated: false, loading: true };
    async componentDidMount() {
        let isAuthenticated = false;
        try {
            isAuthenticated = await Auth.currentUserInfo();
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
            this.setState({ isAuthenticated, loading: false });
        };
    };
    render() {
        return (
            <Router>
                <ScrollToTop>
                    {
                        this.state.loading ?
                            null : <App isAuthenticated={this.state.isAuthenticated} />
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
