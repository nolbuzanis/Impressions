import React from 'react';
import SongList from './SongList';
import Player from './Player';
import { connect } from 'react-redux';
import { fetchDevice } from '../actions';

class Library extends React.Component {
  state = { activeDevice: null };

  getActiveDevice = activeDevice => {
    this.setState({ activeDevice });
  };

  render() {
    console.log(this.state.activeDevice);
    return (
      <div>
        <SongList deviceId={this.state.activeDevice} />
        <Player
          getActiveDevice={activeDevice => this.getActiveDevice(activeDevice)}
        />
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
