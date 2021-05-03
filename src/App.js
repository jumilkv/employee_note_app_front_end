import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/auth/login';
import SignUp from './components/auth/signup';
import Layout from './layout';
import './App.css';
import { withRouter } from 'react-router';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Layout />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);