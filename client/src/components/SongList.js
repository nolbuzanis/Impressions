import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserLibrary, fetchUserImpressions } from '../actions';

import './SongList.css';

class SongList extends Component {
  componentDidMount() {
    if (!this.props.library) {
      this.props.fetchUserLibrary(this.props.auth.accessToken);
    }
  }
  componentDidUpdate() {
    if (this.props.library && !this.props.audioFeatures) {
      const listOfIds = [];
      this.props.library.forEach(({ id }) => {
        listOfIds.push(id);
      });
      this.props.fetchUserImpressions(listOfIds, this.props.auth.accessToken);
    }
  }

  renderListOfSongs = () => {
    if (this.props.library && this.props.audioFeatures) {
      return this.props.library.map(song => {
        this.props.audioFeatures.allsongs.forEach(features => {
          if (features.id === song.id) {
            song.features = features;
            console.log(song.features);
          }
        });
        return (
          <tr key={song.id} className='collection-item'>
            <td>{song.name}</td>
            <td>{song.artists.join(', ')}</td>
            <td>{song.album}</td>
            <td>{Math.round(song.features.a * 100)}</td>
            <td>{Math.round(song.features.d * 100)}</td>
            <td>{Math.round(song.features.e * 100)}</td>
            <td>{Math.round(song.features.v * 100)}</td>
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
              <th>Acousticness</th>
              <th>Danceability</th>
              <th>Energy</th>
              <th>Valence</th>
            </tr>
          </thead>

          <tbody>{this.renderListOfSongs()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    library: state.spotify.library,
    audioFeatures: state.spotify.audioFeatures
  };
};

export default connect(
  mapStateToProps,
  { fetchUserLibrary, fetchUserImpressions }
)(SongList);
