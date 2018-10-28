import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './components/App';
import Home from './components/Home'
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import NotFound from './components/NotFound';
import { getCurrentUser } from './actions/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      props.isAuthenticated ? (
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
  componentDidMount() {
    const session = window.localStorage.getItem('token');
    if (session) {
      this.props.getCurrentUser(session);
    }
  }
  render() {
    console.log(this.props);
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <PrivateRoute path="/dashboard" component={DashboardContainer} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

const select = state => ({
  error: state.error,
  isLoggedIn: state.auth.isLoggedIn,
  isSigningUp: state.auth.isSigningUp
});

const actions = {
  getCurrentUser
};

export default connect(select, actions)(Routes);
