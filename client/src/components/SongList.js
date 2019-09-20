import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserLibrary } from '../actions';

class SongList extends Component {
  componentDidMount() {
    this.props.fetchUserLibrary(this.props.auth.accessToken);
  }

  renderListOfSongs = () => {
    if (this.props.library) {
      return this.props.library.map(song => {
        console.log(song.name);
        return <p>{song.name}</p>;
      });
    }
    return null;
  };

  render() {
    return <div>{this.renderListOfSongs()}</div>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, library: state.spotify.library };
};

export default connect(
  mapStateToProps,
  { fetchUserLibrary }
)(SongList);
