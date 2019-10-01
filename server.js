const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
require('./models/User');
require('./models/Song');
require('./services/passport'); //Passport config

const app = express();

// tell express to make use of cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //Last for 30 days (in microseconds)
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  // Serve any production assets like our main.css or main.js
  app.use(express.static('client/build'));
  // Handle all routing --> serve up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

require('./routes/authRoutes')(app); // Spotify OAuth
require('./routes/spotifyRoutes')(app); //routes for fetching data from Spotify Web API

const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
