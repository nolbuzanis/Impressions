const passport = require('passport');

module.exports = app => {
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

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
