import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  componentDidUpdate() {
    if (!this.props.auth.name) {
      this.props.history.push('/');
    }
  }
  render() {
    return <div>Profile</div>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
