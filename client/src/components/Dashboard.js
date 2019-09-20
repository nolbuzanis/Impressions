import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SongList from './SongList';
import { fetchUserImpressions } from '../actions';

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
      this.props.fetchUserImpressions(listOfIds);
    }
  }

  render() {
    if (!this.props.auth) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <SongList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, library: state.spotify.library };
};

export default connect(
  mapStateToProps,
  { fetchUserImpressions }
)(Dashboard);
