import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from '../Components/Pages/Login';
import ErrorConnect from '../Components/ErrorPage/ErrorConnect';
import NoMatch from '../Components/ErrorPage/NoMatch';
// import Layout from '../Components/Dashboard/Dashboard';
let Layout = null;

Layout = require('../Components/Dashboard/Dashboard').default;

export default () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/error-connect" component={ErrorConnect} />
        <Route path="/" component={Layout} />
        <Route component={NoMatch} />
        
    </Switch>
)