import React, { Component } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Header from './Header';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path='/' component={Landing} exact />
            <Route path='/profile' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
