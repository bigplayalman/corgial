import { connect } from 'react-redux';
import { login } from '../actions/auth';
import Login from '../components/Login';

const select = state => ({
  error: state.error,
  isLoggedIn: state.auth.isLoggedIn,
  isLoggingIn: state.auth.isLoggingIn
});

const actions = {
  login
};

export default connect(select, actions)(Login);
