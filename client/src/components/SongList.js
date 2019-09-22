import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserLibrary } from '../actions';

import './SongList.css';

class SongList extends Component {
  componentDidMount() {
    if (!this.props.library) {
      this.props.fetchUserLibrary(this.props.auth.accessToken);
    }
  }

  renderListOfSongs = () => {
    if (this.props.library) {
      console.log(this.props.library.length);
      return this.props.library.map(song => {
        console.log(song);
        return (
          <li key={song.id} className='collection-item'>
            {song.name}
          </li>
        );
      });
    }
    return null;
  };

  render() {
    return (
      <div style={{ paddingLeft: '200px' }} className='blue-grey darken-4'>
        <h4
          className='center'
          style={{
            marginTop: '0',
            paddingTop: '50px',
            color: 'white',
            letterSpacing: '0.1em'
          }}
        >
          Your Library
        </h4>
        <ul className='collection songlist'>{this.renderListOfSongs()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, library: state.spotify.library };
};

export default connect(
  mapStateToProps,
  { fetchUserLibrary }
)(SongList);
