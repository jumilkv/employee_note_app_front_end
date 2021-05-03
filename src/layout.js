import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';
import Cookie from "js-cookie";
import AppBar from './components/header/appBar';
import Dashboard from './components/dashboard/dashboard';
import Employees from './components/employee/employee';

export default function Layout() {
    let history = useHistory();
    if (Cookie.get(process.env.REACT_APP_AUTH_TOKEN) === '' || Cookie.get(process.env.REACT_APP_AUTH_TOKEN) === undefined) {
        history.push('/');
    }

    return (
        <div>
            <AppBar />
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/employees/:type" component={Employees} />
                <Route path="*" render={() => (<Redirect to="/dashboard" />)} />
            </Switch>
        </div >
    );
}
