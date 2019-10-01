import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import history from './history';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div>
        <ul className='nav fixed-top'>
          <li className='nav-item dropdown'>
            <div
              className='nav-link'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <div
                className='profile-image'
                style={{
                  background: `url(${this.props.auth.photo}) center center no-repeat`,
                  backgroundSize: 'cover'
                }}
              ></div>
            </div>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <a href='/api/logout' className='dropdown-item'>
                Log Out
              </a>
            </div>
          </li>

          <li className='nav-item'>
            <Link
              to='/'
              className={`nav-link ${
                history.location.pathname === '/' ? 'active' : ''
              }`}
            >
              Profile
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/allsongs'
              className={`nav-link ${
                history.location.pathname === '/allsongs' ? 'active' : ''
              }`}
            >
              Library
            </Link>
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
)(Header);
