import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';

class Signup extends Component {
  constructor(props) {
    super(props);

    if (props.isLoggedIn) {
      props.history.push('/dashboard');
    }

    this.state = {
      username: '',
      password: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }


  handleFormSubmit(e) {
    e.preventDefault();

    const { username } = this.state;

    if(!username) {
      return;
    }
    const user = {
      "authData": {
          "anonymous": {
              "id": uniqid(username)
          }
      },
      username
  }

    this.props.signup(user);
  }

  handleTextFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillUpdate(nextProps) {
    if(nextProps.isLoggedIn) {
      nextProps.history.push('/dashboard');
    }
  }

  render() {
    const { error, isSigningUp } = this.props;
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleFormSubmit}>
          {error}
          <p>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleTextFieldChange}
              required
            />
          </p>
          <p>
            <input
              type="submit"
              value={isSigningUp ? 'Signing up...' : 'Sign up'}
              disabled={isSigningUp}
            />
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
