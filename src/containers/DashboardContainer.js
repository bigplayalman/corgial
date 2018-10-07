import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render() {
    return (
      <p>You are logged in. (user id: {this.props.userId})</p>
    );
  }
}

DashboardContainer.propTypes = {
  userId: PropTypes.string
};

const select = (state) => ({
  userId: state.auth.userId
});

export default connect(select)(DashboardContainer);
