const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy(['/api', '/auth/spotify'], {
      target: 'http://localhost:8000',
      changeOrigin: true
    })
  );
};
