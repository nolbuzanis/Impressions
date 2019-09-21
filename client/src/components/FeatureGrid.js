import React from 'react';
import FeatureSpotlight from './FeatureSpotlight';

class featureGrid extends React.Component {
  render() {
    const { tastes } = this.props;

    console.log(tastes);
    return (
      <div className='row'>
        <FeatureSpotlight
          name='acousticness'
          percentage={tastes.acousticness}
        />
        <FeatureSpotlight
          name='danceability'
          percentage={tastes.danceability}
        />
        <FeatureSpotlight name='energy' percentage={tastes.energy} />
        <FeatureSpotlight name='valence' percentage={tastes.valence} />
      </div>
    );
  }
}

export default featureGrid;
