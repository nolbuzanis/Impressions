import React from 'react';
import './Player.css';
import { Link } from 'react-router-dom';

class Player extends React.Component {
  render() {
    return (
      <ul className='fixed-bottom player'>
        <li>
          <Link to='/' className='player-link'>
            <i class='material-icons'>shuffle</i>
          </Link>
        </li>
        <li>
          <Link to='/' className='player-link'>
            <i class='material-icons'>skip_previous</i>
          </Link>
        </li>
        <li>
          <Link to='/' className='player-link'>
            <i class='material-icons'>play_arrow</i>
          </Link>
        </li>
        <li>
          <Link to='/' className='player-link'>
            <i class='material-icons'>skip_next</i>
          </Link>
        </li>
        <li>
          <Link to='/' className='player-link'>
            <i class='material-icons'>repeat</i>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Player;
