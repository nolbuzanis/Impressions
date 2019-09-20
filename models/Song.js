const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  songId: String,
  name: String,
  features: {
    accousticness: Number,
    danceability: Number,
    energy: Number,
    valence: Number
  }
});

mongoose.model('songs', songSchema);
