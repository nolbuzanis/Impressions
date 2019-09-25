import React from 'react';
import SongList from './SongList';
import Player from './Player';
import { connect } from 'react-redux';
import history from './history';
import { Redirect } from 'react-router-dom';

class Library extends React.Component {
  initializePlayer = () => {
    if (window.Spotify !== null) {
      console.log('Initializing...');
      console.log(this.props.auth.accessToken);
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
        console.log(state);
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
      this.player.connect();
    }
    console.log(this.player);
  };

  render() {
    if (window.loadedSpotifyPlayer) {
      this.initializePlayer();
    }

    return (
      <div>
        <SongList />
        <Player />
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
)(Library);
