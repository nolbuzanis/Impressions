const axios = require('axios');
const mongoose = require('mongoose');
const Song = mongoose.model('songs');
const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/current_user_library', async (req, res) => {
    try {
      const promise = await axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: {
          Authorization: `Bearer ${req.query.token}`
        }
      });

      const songlist = []; // List of objects to hold the songs

      promise.data.items.forEach(({ track }) => {
        songlist.push({
          id: track.id,
          name: track.name
        });
      });

      res.send({ library: songlist });
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/api/audio_features', (req, res) => {
    // Capture string of ids from object and convert them into an array
    const ids = Object.values(req.query).join(',');

    console.log(ids);
  });
};
