import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from './history';

import Landing from './Landing';
import Dashboard from './Dashboard';
import Library from './Library';
import Header from './Header';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Route path='/' component={this.props.auth ? Header : ''} />
          <Route
            path='/'
            component={!this.props.auth ? Landing : Dashboard}
            exact
          />
          <Route
            path='/allsongs'
            component={!this.props.auth ? Landing : Library}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(App);
