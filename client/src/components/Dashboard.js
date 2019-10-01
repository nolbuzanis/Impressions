import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchUserImpressions,
  fetchUserLibrary,
  fetchTopSongs
} from '../actions';
import FeatureGrid from './FeatureGrid';
import './Dashboard.css';
import TopSongs from './TopSongs';

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
    if (this.props.auth) {
      this.props.fetchTopSongs(this.props.auth.accessToken);
    }
    if (!this.props.auth) return <div>Loading...</div>;
    return (
      <div className='container' style={{ paddingTop: '120px' }}>
        <h4
          style={{
            paddingBottom: '20px'
          }}
        >
          Your Audio Profile
        </h4>
        <FeatureGrid tastes={this.props.auth.tastes} />
        <h4
          style={{
            paddingTop: '10px',
            paddingBottom: '20px'
          }}
        >
          Top Songs
        </h4>
        <TopSongs />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, library: state.spotify.library };
};

export default connect(
  mapStateToProps,
  { fetchUserImpressions, fetchUserLibrary, fetchTopSongs }
)(Dashboard);
