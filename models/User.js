const mongoose = require('mongoose');
const { Schema } = mongoose; // same as const Schema = mongoose.Schema

const userSchema = new Schema({
  spotifyId: String,
  name: String,
  accessToken: String,
  tastes: {
    accousticness: Float32Array,
    danceability: Float32Array,
    energy: Float32Array,
    valence: Float32Array
  }
});

mongoose.model('users', userSchema);
