const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ spotifyId: profile.id }).then(existingUser => {
        if (!existingUser) {
          new User({ spotifyId: profile.id, name: profile.displayName })
            .save()
            .then(newUser => {
              done(null, newUser);
            }); // create a new user
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
