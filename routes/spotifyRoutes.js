const axios = require('axios');
const mongoose = require('mongoose');
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
          songlist.push({
            id: track.id,
            name: track.name,
            artists: track.artists.map(({ name }) => {
              return name;
            }),
            album: track.album.name,
            duration: track.duration_ms,
            uri: track.uri
          });
        });

        if (promise.data.items.length < 20 || offset === 200) {
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

    const numberOfSongs = req.query.ids.length;
    const ids = req.query.ids;
    var total_a = 0.0; //acousticness
    var total_d = 0.0; //danceability
    var total_e = 0.0; //energy
    var total_v = 0.0; //valence
    songFeatures = [];
    console.log('Total # of songs:', numberOfSongs);
    console.log(Math.ceil(numberOfSongs / 100));

    for (let i = 0; i < Math.ceil(numberOfSongs / 100); i++) {
      const partialIds = ids.slice(0 + 100 * i, 100 + 100 * i).join(',');

      try {
        const promise = await axios.get(
          'https://api.spotify.com/v1/audio-features/',
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              ids: partialIds
            }
          }
        );

        promise.data.audio_features.forEach(object => {
          songFeatures.push({
            id: object.id,
            a: object.acousticness,
            d: object.danceability,
            e: object.energy,
            v: object.valence
          });

          // Add to ongoing sum
          total_a += object.acousticness;
          total_d += object.danceability;
          total_e += object.energy;
          total_v += object.valence;
        });

        // console.log('Total acousticness:', total_a);
        // console.log('Total danceability:', total_d);
        // console.log('Total energy:', total_e);
        // console.log('Total valence:', total_v);
      } catch (error) {
        console.log(error);
      }

      if (i * 100 > numberOfSongs) {
        break;
      }
    }
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
    res.send({ impressions, allsongs: songFeatures });
  });
};
