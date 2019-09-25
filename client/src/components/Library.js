import React from 'react';
import SongList from './SongList';
import Player from './Player';
import { connect } from 'react-redux';

class Library extends React.Component {
  render() {
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
