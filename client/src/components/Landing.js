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
          <a href='/auth/spotify' className='call-to-action btn-lg btn'>
            Start your journey
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
