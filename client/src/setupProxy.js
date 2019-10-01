const proxy = require('http-proxy-middleware');

module.exports = app => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  app.use(
    proxy(['/api', '/auth/spotify'], {
      target: 'http://localhost:8000'
    })
  );
};
