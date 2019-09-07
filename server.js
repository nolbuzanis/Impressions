const mongoose = require('mongoose');
const express = require('express');
const app = express();

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

require('./routes/authRoutes')(app); // Spotify OAuth
require('./services/passport'); //Passport config

const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
