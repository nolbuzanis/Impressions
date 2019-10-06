import React from 'react';
import './Player.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { playSong } from '../actions';

//Tippy.js
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

class Player extends React.Component {
  state = {
    paused: true,
    album: null,
    deviceId: null,
    songId: null,
    shuffle: false,
    repeat: false
  };

  componentDidMount() {
    if (window.loadedSpotifyPlayer && !this.player) {
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
        this.setState({ deviceId: device_id });
        this.props.getActiveDevice(device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        this.setState({ deviceId: device_id });
      });
      this.player.connect();
    }
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
    const songId = currentTrack.linked_from.id || currentTrack.id;
    const { paused, duration, position } = state;

    this.setState({
      songId,
      trackName,
      album,
      artistName,
      paused,
      duration,
      position
    });
  };

  togglePlaySong = () => {
    // If song is already playing/ paused
    if (this.state.trackName) {
      this.player.togglePlay();
    } else {
      // If shuffle is selected
      if (this.state.shuffle) {
        this.playRandomSong();
        return;
      }

      // Play song from beginning
      this.props.playSong(
        this.props.auth.accessToken,
        this.state.deviceId,
        this.props.spotify.library[0].uri
      );
    }
  };

  findCurrentIndex = () => {
    for (const [
      i,
      song
    ] of this.props.spotify.audioFeatures.allsongs.entries()) {
      if (this.state.songId === song.id) {
        return i;
      }
    }
  };

  renderSongFeatures = () => {
    // No song currently playing
    if (!this.state.songId) {
      return null;
    }

    const index = this.findCurrentIndex();

    var { a, d, e, v } = this.props.spotify.audioFeatures.allsongs[index];
    a = Math.round(a * 100);
    d = Math.round(d * 100);
    e = Math.round(e * 100);

    v = Math.round(v * 100);

    const colors = {
      acousticness: '#999AFF',
      danceability: '#FF6666',
      energy: '#FFA401',
      valence: '#3E98C7'
    };

    //Tooltips
    tippy('#acousticness', {
      content: 'acousticness'
    });
    tippy('#danceability', {
      content: 'danceability'
    });
    tippy('#energy', {
      content: 'energy'
    });
    tippy('#valence', {
      content: 'valence'
    });

    return (
      <ul>
        <li id='acousticness' style={{ background: colors.acousticness }}>
          {' '}
          {a}
        </li>
        <li id='danceability' style={{ background: colors.danceability }}>
          {' '}
          {d}
        </li>
        <li id='energy' style={{ background: colors.energy }}>
          {e}
        </li>
        <li id='valence' style={{ background: colors.valence }}>
          {' '}
          {v}
        </li>
      </ul>
    );
  };

  previousTrack = () => {
    // If current song is the first one in the library, start it again
    if (!this.props.spotify.library[this.findCurrentIndex() - 1]) {
      this.props.playSong(
        this.props.auth.accessToken,
        this.state.deviceId,
        this.props.spotify.library[0].uri
      );
      return;
    }
    // If no song is currently playing
    if (!this.state.trackName) {
      this.togglePlaySong();
      return;
    }
    const uri = this.props.spotify.library[this.findCurrentIndex() - 1].uri;
    this.props.playSong(this.props.auth.accessToken, this.state.deviceId, uri);
  };

  playRandomSong = () => {
    const randIndex = Math.floor(
      Math.random() * this.props.spotify.library.length
    );
    this.props.playSong(
      this.props.auth.accessToken,
      this.state.deviceId,
      this.props.spotify.library[randIndex].uri
    );
  };

  nextTrack = () => {
    // If shuffle is true:
    if (this.state.shuffle) {
      this.playRandomSong();
      return;
    }
    // If current song is the last one in the library, play from beginning
    if (!this.props.spotify.library[this.findCurrentIndex() + 1]) {
      this.props.playSong(
        this.props.auth.accessToken,
        this.state.deviceId,
        this.props.spotify.library[0].uri
      );
      return;
    }
    // If no song is currently playing
    if (!this.state.trackName) {
      this.togglePlaySong();
      return;
    }
    const uri = this.props.spotify.library[this.findCurrentIndex() + 1].uri;
    this.props.playSong(this.props.auth.accessToken, this.state.deviceId, uri);
  };

  toggleShuffle = () => {
    // If false, set true
    if (!this.state.shuffle) {
      this.setState({ shuffle: true });
      return;
    }
    this.setState({ shuffle: false });
  };

  render() {
    return (
      <div className='fixed-bottom player'>
        <div
          className='currently-playing'
          style={{ display: `${this.state.trackName ? 'inherit' : 'none'}` }}
        >
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
            <button
              className='player-link'
              onClick={() => {
                this.toggleShuffle();
              }}
            >
              <i
                className='material-icons'
                style={{
                  color: `${this.state.shuffle ? '#0074D9' : ''}`
                }}
              >
                shuffle
              </i>
            </button>
          </li>
          <li>
            <button
              className='player-link'
              onClick={() => this.previousTrack()}
            >
              <i className='material-icons'>skip_previous</i>
            </button>
          </li>
          <li>
            <button
              className='player-link'
              onClick={() => this.togglePlaySong()}
            >
              <i className='material-icons'>
                {this.state.paused ? 'play_arrow' : 'pause'}
              </i>
            </button>
          </li>
          <li>
            <button className='player-link' onClick={() => this.nextTrack()}>
              <i className='material-icons'>skip_next</i>
            </button>
          </li>
          <li>
            <button className='player-link'>
              <i className='material-icons'>repeat</i>
            </button>
          </li>
        </ul>
        <div className='song-features'>{this.renderSongFeatures()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    spotify: state.spotify
  };
};

export default connect(
  mapStateToProps,
  { playSong }
)(Player);
