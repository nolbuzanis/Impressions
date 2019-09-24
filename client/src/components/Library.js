import React from 'react';
import SongList from './SongList';
import Player from './Player';

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

export default Library;
