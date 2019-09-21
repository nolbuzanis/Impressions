import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import ProgressBar from 'progressbar.js';

class featureSpotlight extends React.Component {
  render() {
    return (
      <div className='col s12 m6 l3' style={{ padding: '150px' }}>
        <CircularProgressbar
          value={this.props.percentage * 100}
          text={`${Math.round(this.props.percentage * 100) / 100}`}
        />
        <h4 style={{ color: 'white' }}>{this.props.name}</h4>
      </div>
    );
  }
}

export default featureSpotlight;
