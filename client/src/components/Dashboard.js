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
      <div className='dashboard-container blue-grey darken-4'>
        <h4
          className='center'
          style={{
            marginTop: '0',
            paddingTop: '50px',
            color: 'white',
            letterSpacing: '0.1em'
          }}
        >
          Your Impressions
        </h4>
        <FeatureGrid tastes={this.props.auth.tastes} />
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
