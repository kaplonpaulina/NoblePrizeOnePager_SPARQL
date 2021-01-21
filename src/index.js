import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router-dom";

import "assets/css/material-dashboard-react.scss?v=1.9.0";
import OnePager from "./views/OnePager/OnePager";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/nobelPrize" component={OnePager}/>
            <Redirect from="/" to="/nobelPrize"/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
