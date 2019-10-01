import React from 'react';
import FeatureSpotlight from './FeatureSpotlight';
import { connect } from 'react-redux';

class featureGrid extends React.Component {
  render() {
    var tastes;
    if (this.props.auth.tastes) {
      tastes = this.props.auth.tastes;
    } else if (!this.props.spotify.audioFeatures) {
      console.log('Does not exist!');
      return null;
    } else {
      tastes = this.props.spotify.audioFeatures.impressions;
    }

    return (
      <div className='row'>
        <FeatureSpotlight
          name='acousticness'
          percentage={tastes.acousticness}
          pathColor={colors.acousticness}
          description={audioDescriptions.acousticness}
        />
        <FeatureSpotlight
          name='danceability'
          percentage={tastes.danceability}
          pathColor={colors.danceability}
          description={audioDescriptions.danceability}
        />
        <FeatureSpotlight
          name='energy'
          percentage={tastes.energy}
          pathColor={colors.energy}
          description={audioDescriptions.energy}
        />
        <FeatureSpotlight
          name='valence'
          percentage={tastes.valence}
          pathColor={colors.valence}
          description={audioDescriptions.valence}
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

const audioDescriptions = {
  acousticness:
    'A confidence measure from 0-100 of how acoustic your tracks are. 100 represents a high confidence.',
  danceability:
    'How suitable your tracks are for dancing based on musical elements: tempo, rythmn stabiity, beat strength, and overall regularity.',
  energy:
    'Perceptual measure of intensity and activity of your library. Energetic tracks feel fast, loud, and noisy and encompase audio features such as dynamic range, perceived loudness, timbre, onset rate, and general entropy',
  valence:
    'A description of the musical positiveness of your tracks. A high valence means more positive sounding tracks (eg. happy, cheerful, euphoric), while a low valence relates to more negative sounds (eg. sad, depressed, angry). '
};

const mapStateToProps = state => {
  return { auth: state.auth, spotify: state.spotify };
};

export default connect(
  mapStateToProps,
  null
)(featureGrid);
