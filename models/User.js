const mongoose = require('mongoose');
const { Schema } = mongoose; // same as const Schema = mongoose.Schema

const userSchema = new Schema({
  spotifyId: String,
  name: String,
  accessToken: String,
  tastes: {
    accousticness: Number,
    danceability: Number,
    energy: Number,
    valence: Number
  }
});

mongoose.model('users', userSchema);
