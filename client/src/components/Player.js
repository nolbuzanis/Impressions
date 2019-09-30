import React from 'react';
import './Player.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Player extends React.Component {
  state = { paused: true, album: null };

  componentDidMount() {
    if (window.loadedSpotifyPlayer) {
      this.initializePlayer();
    }

    window.addEventListener('load', this.initializePlayer);
  }

  initializePlayer = () => {
    if (window.Spotify !== null) {
      console.log('Initializing...');

      this.player = new window.Spotify.Player({
        name: 'Impressions',
        getOAuthToken: cb => {
          cb(this.props.auth.accessToken);
        }
      });

      // Error handling
      this.player.on('initialization_error', e => {
        console.error(e);
      });
      this.player.on('authentication_error', e => {
        console.error(e);
        return <Redirect to='/dashboard' />;
      });
      this.player.on('account_error', e => {
        console.error(e);
      });
      this.player.on('playback_error', e => {
        console.error(e);
      });

      // Playback status updates
      this.player.on('player_state_changed', state => {
        this.onStateChanged(state);
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        this.setState({ deviceId: device_id });
      });
      this.player.connect();
    }
    console.log(this.player);
  };

  //Handle players state to update our own component level state
  onStateChanged = state => {
    // If no longer listening to music, return
    if (state === null) {
      return;
    }
    const currentTrack = state.track_window.current_track;

    const trackName = currentTrack.name;
    const album = currentTrack.album;
    const artistName = currentTrack.artists
      .map(artist => {
        return artist.name;
      })
      .join(',');
    const { paused, shuffle, repeat_mode, duration, position } = state;

    this.setState({
      trackName,
      album,
      artistName,
      paused,
      shuffle,
      repeat_mode,
      duration,
      position
    });
  };

  render() {
    return (
      <div className='fixed-bottom player'>
        <div className='currently-playing'>
          <div
            className='album-artwork'
            style={{
              background: `url(${
                this.state.album ? `${this.state.album.images[1].url}` : ''
              })`
            }}
          ></div>
          <div className='song-info'>
            <p className='song-name'>{this.state.trackName}</p>
            <p>{this.state.artistName}</p>
          </div>
        </div>
        <ul className='player-controls'>
          <li>
            <button className='player-link'>
              <i className='material-icons'>shuffle</i>
            </button>
          </li>
          <li>
            <button
              className='player-link'
              onClick={() => this.player.previousTrack()}
            >
              <i className='material-icons'>skip_previous</i>
            </button>
          </li>
          <li>
            <button
              className='player-link'
              onClick={() => this.player.togglePlay()}
            >
              <i className='material-icons'>
                {this.state.paused ? 'play_arrow' : 'pause'}
              </i>
            </button>
          </li>
          <li>
            <button
              className='player-link'
              onClick={() => this.player.nextTrack()}
            >
              <i className='material-icons'>skip_next</i>
            </button>
          </li>
          <li>
            <button className='player-link'>
              <i className='material-icons'>repeat</i>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  null
)(Player);
