import React from 'react';
import { connect } from 'react-redux';
import './TopSongs.css';

class TopSongs extends React.Component {
  findCurrentIndex = songId => {
    for (const [
      i,
      song
    ] of this.props.spotify.audioFeatures.allsongs.entries()) {
      if (songId === song.id) {
        return i;
      }
    }
    return 0;
  };

  renderSongFeatures = songId => {
    // Features have no loaded yet
    if (!this.props.spotify.audioFeatures || !songId) {
      return null;
    }
    const index = this.findCurrentIndex(songId);

    if (index) {
      var { a, d, e, v } = this.props.spotify.audioFeatures.allsongs[index];
      a = Math.round(a * 100);
      d = Math.round(d * 100);
      e = Math.round(e * 100);
      v = Math.round(v * 100);
    } else {
      const a = '-';
      const d = '-';
      const v = '-';
      const e = '-';
    }

    const colors = {
      acousticness: '#999AFF',
      danceability: '#FF6666',
      energy: '#FFA401',
      valence: '#3E98C7'
    };

    return (
      <div className='song-features'>
        <ul>
          <li
            className='feature'
            style={{ background: `${colors.acousticness}` }}
          >
            {a}
          </li>
          <li
            className='feature'
            style={{ background: `${colors.danceability}` }}
          >
            {d}
          </li>
          <li className='feature' style={{ background: `${colors.energy}` }}>
            {e}
          </li>
          <li className='feature' style={{ background: `${colors.valence}` }}>
            {v}
          </li>
        </ul>
      </div>
    );
  };

  renderSongCard = () => {
    return this.props.top.map(song => {
      return (
        <div className='col-sm' style={{ paddingTop: '10px' }}>
          <div
            className='album-artwork'
            style={{
              background: `url(${song.album.images[1].url}) center center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='song-info'>
            <p className='song-name'>{song.name}</p>
            <p className='artist-name'>{song.artists[0].name}</p>
          </div>
          {this.renderSongFeatures(song.id)}
        </div>
      );
    });
  };

  render() {
    return (
      <div className='row'>{this.props.top ? this.renderSongCard() : null}</div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    top: state.spotify.users_top,
    spotify: state.spotify
  };
};

export default connect(
  mapStateTopProps,
  null
)(TopSongs);
