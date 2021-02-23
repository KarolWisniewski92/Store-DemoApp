import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import Dashboard from './Dashboard';
import RegisterForm from './RegisterForm'
import LogInForm from './LogInForm'

export default class Router extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/logIn" component={LogInForm} />
                    <Route exact path="/createAccount" component={RegisterForm} />
                    {/* <Route component={PageNotFound} /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}
