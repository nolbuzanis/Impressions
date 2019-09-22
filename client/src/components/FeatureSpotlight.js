import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import ProgressBar from 'progressbar.js';

class featureSpotlight extends React.Component {
  render() {
    return (
      <div className='col s12 m6 l3' style={{ padding: '20px' }}>
        <div style={{ margin: '20%' }}>
          <CircularProgressbar
            value={this.props.percentage * 100}
            text={`${Math.round(this.props.percentage * 100) / 100}${
              Math.round(this.props.percentage * 100) % 10 === 0 ? '0' : ''
            }  `}
            strokeWidth='6'
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              //rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',

              // Text size
              textSize: '16px',

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `${this.props.pathColor}`,
              textColor: 'rgba(255,255,255,0.9)',
              trailColor: 'rgba(255,255,255,0.2)',
              backgroundColor: 'white'
            })}
          />
        </div>
        <h5 style={{ color: 'white', textAlign: 'center' }}>
          {this.props.name}
        </h5>
      </div>
    );
  }
}

export default featureSpotlight;
