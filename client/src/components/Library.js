import React from 'react';
import SongList from './SongList';
import Player from './Player';
import { connect } from 'react-redux';
import { fetchDevice } from '../actions';

class Library extends React.Component {
  componentWillMount() {
    this.props.fetchDevice();
  }

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
  { fetchDevice }
)(Library);
