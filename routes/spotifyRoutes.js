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

      promise.data.items.forEach(({ track }) => {
        console.log(track);
      });
      //console.log(promise);
    } catch (error) {
      console.error(error);
    }
  });
};
