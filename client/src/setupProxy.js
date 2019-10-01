const proxy = require('http-proxy-middleware');
import '../../config/keys';

module.exports = app => {
  app.use(proxy(['/api', '/auth/spotify'], { target: proxyTo }));
};
