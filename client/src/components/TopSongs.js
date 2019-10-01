import React from 'react';
import { connect } from 'react-redux';
import './TopSongs.css';

class TopSongs extends React.Component {
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
  return { top: state.spotify.users_top };
};

export default connect(
  mapStateTopProps,
  null
)(TopSongs);
