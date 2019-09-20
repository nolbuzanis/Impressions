import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SongList from './SongList';

class Dashboard extends Component {
  componentDidUpdate() {
    if (!this.props.auth.name) {
      this.props.history.push('/');
    }
  }

  render() {
    if (!this.props.auth) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <SongList />
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
)(Dashboard);
