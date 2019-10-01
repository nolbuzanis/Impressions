if (process.env.NODE_ENV === 'production') {
  // We are in production
  module.exports = require('./prod');
} else {
  // In development
  module.exports = require('./dev');
}

//mongodb+srv://dbAdmin:M@rley1997@cluster0-5lvpn.mongodb.net/test?retryWrites=true&w=majority
// Client ID: c39d9ec26c6d4a4bb5b6dd57182856b1
// Cient secret: 7c4891a03b3f414d94daa3ee38077dd2
