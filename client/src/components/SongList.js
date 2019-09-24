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
      return this.props.library.map((song, i) => {
        this.props.audioFeatures.allsongs.forEach(features => {
          if (features.id === song.id) {
            song.features = features;
            console.log(song.features);
          }
        });

        return (
          <tr key={song.id} scope='row' class='table-rows table-data'>
            <td className='middle-align'>{i + 1}</td>
            <td>
              <p className='song-name'>{song.name}</p>
              <p>
                {song.artists.join(', ')} | {song.album}
              </p>
            </td>

            <td className='middle-align'>
              {`${Math.floor(song.duration / 1000 / 60)} : ${
                Math.round((song.duration / 1000) % 60) < 10
                  ? `${Math.round((song.duration / 1000) % 60)}0`
                  : `${Math.round((song.duration / 1000) % 60)}`
              }`}
            </td>
          </tr>
        );
      });
    }
    return null;
  };

  render() {
    return (
      <div className='container' style={{ marginTop: '40px' }}>
        <table className='table listofallsongs'>
          <thead>
            <tr class='table-rows table-headings'>
              <th scope='col' className='middle-align'>
                No.
              </th>
              <th scope='col'>Track</th>
              <th scope='col' className='middle-align'>
                Time
              </th>
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
