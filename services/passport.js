const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log(accessToken);
      //console.log(refreshToken);
      console.log(profile);
    }
  )
);
