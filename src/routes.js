import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home'
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import NotFound from './components/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      props.auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route component={NotFound} />
            <PrivateRoute path="/dashboard" component={DashboardContainer} />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

export default Routes;
