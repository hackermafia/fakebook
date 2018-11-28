// import "./debug.css";

import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "app/App";
import registerServiceWorker from "registerServiceWorker";
import { ScrollToTop } from "components";
class AppWithRouter extends React.Component {
    state = { isAuthenticated: false };
    render() {
        return (
            <Router>
                <ScrollToTop>
                    <App isAuthenticated={this.state.isAuthenticated} />
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
