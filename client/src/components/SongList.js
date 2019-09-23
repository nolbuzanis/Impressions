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
        return (
          <tr key={song.id} className='collection-item'>
            <td>{song.name}</td>
            <td>Alvin</td>
            <td>Alvin</td>
          </tr>
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

        <table className='container collection songlist'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>

          <tbody>{this.renderListOfSongs()}</tbody>
        </table>
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
