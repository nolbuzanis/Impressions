import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { fetchUserImpressions, fetchUserLibrary } from '../actions';
import FeatureGrid from './FeatureGrid';
import './Dashboard.css';

class Dashboard extends Component {
  componentDidUpdate() {
    if (!this.props.auth.name) {
      this.props.history.push('/');
    }
    if (this.props.library) {
      const listOfIds = [];
      this.props.library.forEach(({ id }) => {
        listOfIds.push(id);
      });
      console.log(listOfIds);
      this.props.fetchUserImpressions(listOfIds, this.props.auth.accessToken);
    }
  }

  componentWillMount() {
    if (this.props.auth) {
      this.props.fetchUserLibrary(this.props.auth.accessToken);
    }
  }

  render() {
    if (this.props.auth && !this.props.library) {
      this.props.fetchUserLibrary(this.props.auth.accessToken);
    }
    if (!this.props.auth) return <div>Loading...</div>;
    return (
      <div className='dashboard-container blue-grey darken-4'>
        <Header name={this.props.auth.name} />
        <FeatureGrid tastes={this.props.auth.tastes} />
        {/* <SongList /> */}
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
