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
          pathColor={colors.acousticness}
        />
        <FeatureSpotlight
          name='danceability'
          percentage={tastes.danceability}
          pathColor={colors.danceability}
        />
        <FeatureSpotlight
          name='energy'
          percentage={tastes.energy}
          pathColor={colors.energy}
        />
        <FeatureSpotlight
          name='valence'
          percentage={tastes.valence}
          pathColor={colors.valence}
        />
      </div>
    );
  }
}

const colors = {
  acousticness: '#999AFF',
  danceability: '#FF6666',
  energy: '#FFA401',
  valence: '#3E98C7'
};

export default featureGrid;
