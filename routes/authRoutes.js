const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: [
        'user-library-read',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
        'user-read-playback-state',
        'streaming',
        'user-top-read'
      ]
    })
  );

  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', {
      failureRedirect: '/'
    }),
    (req, res) => {
      console.log('redirecting to...');
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
