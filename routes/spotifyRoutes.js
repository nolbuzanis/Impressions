const axios = require('axios');
const mongoose = require('mongoose');
const Song = mongoose.model('songs');
const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/current_user_library', async (req, res) => {
    try {
      var offset = 0;
      const songlist = []; // List of objects to hold the songs

      while (true) {
        const promise = await axios.get(
          'https://api.spotify.com/v1/me/tracks',
          {
            headers: {
              Authorization: `Bearer ${req.query.token}`
            },
            params: {
              offset: `${offset}`,
              limit: '20'
            }
          }
        );

        offset += 20;

        promise.data.items.forEach(({ track }) => {
          //console.log('--------------------');
          //console.log(track.artists);
          songlist.push({
            id: track.id,
            name: track.name,
            artists: track.artists.map(({ name }) => {
              return name;
            }),
            album: track.album.name
          });
        });
        //console.log(promise.data);
        if (promise.data.items.length < 20 || offset > 60) {
          //console.log(promise.data.items[0]);
          // Reached last set of songs from library, exit loop
          break;
        }
      }
      res.send({ library: songlist });
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/api/audio_features', async (req, res) => {
    // Capture access token and convert array of IDs into a comma-separated list
    const token = req.query.token;
    const ids = req.query.ids.join(',');

    const numberOfSongs = req.query.ids.length;

    try {
      const promise = await axios.get(
        'https://api.spotify.com/v1/audio-features/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            ids
          }
        }
      );

      var total_a = 0.0; //acousticness
      var total_d = 0.0; //danceability
      var total_e = 0.0; //energy
      var total_v = 0.0; //valence

      promise.data.audio_features.forEach(object => {
        total_a += object.acousticness;
        total_d += object.danceability;
        total_e += object.energy;
        total_v += object.valence;
      });

      // console.log('Total acousticness:', total_a);
      // console.log('Total danceability:', total_d);
      // console.log('Total energy:', total_e);
      // console.log('Total valence:', total_v);

      // Divide by the total songs to find the mean value
      var impressions = {
        acousticness: total_a / numberOfSongs,
        danceability: total_d / numberOfSongs,
        energy: total_e / numberOfSongs,
        valence: total_v / numberOfSongs
      };

      // Store those values for each user
      const isUser = await User.findOne({ accessToken: token });
      if (!isUser) {
        console.log('Error: No user matches this request!');
      } else {
        //console.log(isUser);
        isUser.tastes = impressions;
        isUser.save();
      }

      // Send values back to front-end using res object
      res.send({ impressions });
    } catch (error) {
      console.log(error);
    }
  });
};
