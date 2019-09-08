import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='mask'>
        <div className='content'>
          <h1>Impressions</h1>
          <p>
            discover your <strong>personal</strong> taste in music
          </p>
          <a href='/auth/spotify' className='call-to-action btn'>
            <div style={{ position: 'relative' }}>
              <div className='cta-text'>Sign in with</div>
              <svg
                className='spotify-logo'
                enableBackground='new 0 0 128 128'
                id='Social_Icons'
                version='1.1'
                viewBox='0 0 128 128'
                xmlSpace='preserve'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g id='_x34__stroke'>
                  <g id='Spotify_1_'>
                    <rect
                      clipRule='evenodd'
                      fill='none'
                      fillRule='evenodd'
                      height={128}
                      width={128}
                    />
                    <path
                      clipRule='evenodd'
                      d='M64,0C28.8,0,0,28.8,0,64s28.8,64,64,64    s64-28.8,64-64S99.52,0,64,0 M93.44,92.48c-1.28,1.92-3.52,2.56-5.44,1.28c-15.04-9.28-33.92-11.2-56.32-6.08    c-2.24,0.64-4.16-0.96-4.8-2.88c-0.64-2.24,0.96-4.16,2.88-4.8c24.32-5.44,45.44-3.2,62.08,7.04C94.08,88,94.4,90.56,93.44,92.48     M101.12,74.88c-1.6,2.24-4.48,3.2-6.72,1.6c-17.28-10.56-43.52-13.76-63.68-7.36c-2.56,0.64-5.44-0.64-6.08-3.2    c-0.64-2.56,0.64-5.44,3.2-6.08c23.36-7.04,52.16-3.52,72,8.64C101.76,69.44,102.72,72.64,101.12,74.88 M101.76,56.96    C81.28,44.8,47.04,43.52,27.52,49.6c-3.2,0.96-6.4-0.96-7.36-3.84c-0.96-3.2,0.96-6.4,3.84-7.36c22.72-6.72,60.16-5.44,83.84,8.64    c2.88,1.6,3.84,5.44,2.24,8.32C108.48,57.6,104.64,58.56,101.76,56.96'
                      fill='#10BC4C'
                      fillRule='evenodd'
                      id='Spotify'
                    />
                  </g>
                </g>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
