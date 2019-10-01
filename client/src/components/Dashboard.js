import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserImpressions, fetchUserLibrary } from '../actions';
import FeatureGrid from './FeatureGrid';
import './Dashboard.css';

class Dashboard extends Component {
  componentDidUpdate() {
    if (this.props.library) {
      const listOfIds = [];
      this.props.library.forEach(({ id }) => {
        listOfIds.push(id);
      });
      this.props.fetchUserImpressions(listOfIds, this.props.auth.accessToken);
    }
  }

  render() {
    if (this.props.auth && !this.props.library) {
      this.props.fetchUserLibrary(this.props.auth.accessToken);
    }
    if (!this.props.auth) return <div>Loading...</div>;
    return (
      <div className='container' style={{ paddingTop: '120px' }}>
        <h4>Your Audio Profile</h4>
        <FeatureGrid tastes={this.props.auth.tastes} />
        <h4
          style={{
            paddingTop: '10px'
          }}
        >
          Other Info
        </h4>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, library: state.spotify.library };
};

export default connect(
  mapStateToProps,
  { fetchUserImpressions, fetchUserLibrary }
)(Dashboard);
