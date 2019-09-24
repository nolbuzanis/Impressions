import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import history from './history';

class Header extends Component {
  render() {
    return (
      <div>
        {/* <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link to='/api/logout'>Log Out</Link>
            </li>
          </ul> */}

        <ul className='nav '>
          <li className='nav-item'>
            <Link to='/' className='nav-link profile-button'>
              <div className=' profile-icon material-icons'>
                {' '}
                <svg
                  version='1.1'
                  id='Capa_1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  x='0px'
                  y='0px'
                  viewBox='0 0 350 350'
                  style={{ enableBackground: 'new 0 0 350 350' }}
                  xmlSpace='preserve'
                >
                  <g>
                    <path
                      d='M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
		C104.535,132.855,136.084,171.173,175,171.173z'
                    />
                    <path d='M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z' />
                    <path d='M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z' />
                    <path
                      d='M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
		s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
		c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
		c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z'
                    />
                  </g>
                </svg>
              </div>
            </Link>
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

      // <a className='auth-button' href='/api/logout'>
      //   <div className='auth-text'>Log Out</div>

      //   <div className='auth-icon'>
      //     <svg
      //       enableBackground='new 0 0 128 128'
      //       id='Social_Icons'
      //       version='1.1'
      //       viewBox='0 0 128 128'
      //       xmlSpace='preserve'
      //       xmlns='http://www.w3.org/2000/svg'
      //       xmlnsXlink='http://www.w3.org/1999/xlink'
      //     >
      //       <g id='_x34__stroke'>
      //         <g id='Spotify_1_'>
      //           <rect
      //             clipRule='evenodd'
      //             fill='none'
      //             fillRule='evenodd'
      //             height={128}
      //             width={128}
      //           />
      //           <path
      //             clipRule='evenodd'
      //             d='M64,0C28.8,0,0,28.8,0,64s28.8,64,64,64    s64-28.8,64-64S99.52,0,64,0 M93.44,92.48c-1.28,1.92-3.52,2.56-5.44,1.28c-15.04-9.28-33.92-11.2-56.32-6.08    c-2.24,0.64-4.16-0.96-4.8-2.88c-0.64-2.24,0.96-4.16,2.88-4.8c24.32-5.44,45.44-3.2,62.08,7.04C94.08,88,94.4,90.56,93.44,92.48     M101.12,74.88c-1.6,2.24-4.48,3.2-6.72,1.6c-17.28-10.56-43.52-13.76-63.68-7.36c-2.56,0.64-5.44-0.64-6.08-3.2    c-0.64-2.56,0.64-5.44,3.2-6.08c23.36-7.04,52.16-3.52,72,8.64C101.76,69.44,102.72,72.64,101.12,74.88 M101.76,56.96    C81.28,44.8,47.04,43.52,27.52,49.6c-3.2,0.96-6.4-0.96-7.36-3.84c-0.96-3.2,0.96-6.4,3.84-7.36c22.72-6.72,60.16-5.44,83.84,8.64    c2.88,1.6,3.84,5.44,2.24,8.32C108.48,57.6,104.64,58.56,101.76,56.96'
      //             fill='#10BC4C'
      //             fillRule='evenodd'
      //             id='Spotify'
      //           />
      //         </g>
      //       </g>
      //     </svg>
      //   </div>
      // </a>
    );
  }
}

export default Header;
