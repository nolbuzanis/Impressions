const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./config/keys');

const app = express();

// Spotify OAuth

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-library-read', 'user-read-email', 'user-read-private']
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/'
  })
);

const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
