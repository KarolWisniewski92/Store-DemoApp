import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import Dashboard from './Dashboard';
import RegisterForm from './RegisterForm';
import LogInForm from './LogInForm';
import { Provider } from 'react-redux';
import store from '../store/store';

export default class Router extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/logIn" component={LogInForm} />
                        <Route exact path="/createAccount" component={RegisterForm} />
                        {/* <Route component={PageNotFound} /> */}
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
