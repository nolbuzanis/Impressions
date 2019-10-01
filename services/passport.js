const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
  // adds user to the req object. aka req.user
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: '/auth/spotify/callback',
      proxy: true
    },
    async (accessToken, refreshToken, expires, profile, done) => {
      console.log(expires);
      const existingUser = await User.findOne({ spotifyId: profile.id });

      if (!existingUser) {
        const newUser = await new User({
          spotifyId: profile.id,
          name: profile.displayName,
          email: profile._json.email,
          photo: profile.photos[0],
          accessToken: accessToken
        }).save(); // create a new user
        done(null, newUser);
      }
      existingUser.photo = profile.photos[0];
      existingUser.accessToken = accessToken;
      existingUser.save();
      done(null, existingUser);
    }
  )
);
