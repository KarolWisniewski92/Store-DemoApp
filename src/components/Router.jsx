import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';

export default class Router extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    {/* <Route component={PageNotFound} /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}