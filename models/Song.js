const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  songId: String,
  name: String,
  features: {
    accousticness: Float32Array,
    danceability: Float32Array,
    energy: Float32Array,
    valence: Float32Array
  }
});

mongoose.models('songs', songSchema);
