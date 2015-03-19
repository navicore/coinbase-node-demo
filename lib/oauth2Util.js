var config  = require('../config.js');

var oauth2 = require('simple-oauth2')({
  clientID     : config.CLIENT_ID,
  clientSecret : config.CLIENT_SECRET,
  site         : 'https://www.coinbase.com',
  tokenPath    : '/oauth/token'
});

var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri : config.REDIR_URL,
  scope        : 'user balance contacts addresses transactions orders transfers buy sell',
  state        : '3(#0/!~'
});

module.exports.oauth2 = oauth2;
module.exports.authorization_uri = authorization_uri;

