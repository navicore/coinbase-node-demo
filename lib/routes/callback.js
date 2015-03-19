var express = require('express'), 
    config = require('../../config'),
    oauth2 = require('../oauth2Util').oauth2,
    Coinbase = require('coinbase').Client,
    router = express.Router();

require('express-session');

/* GET users listing. */
router.get('/', function(req, res) {

  function saveToken(err, result) {
    if (err) { 
      res.send('Access Token Error: ' + err  + ' ' + JSON.stringify(err));
      return;
    }
    req.session.token = oauth2.accessToken.create(result);
    var cb = new Coinbase({
      'apiKey'      : config.CLIENT_ID,
      'apiSecret'   : config.CLIENT_SECRET,
      'accessToken' : req.session.token.token.access_token,
      'refreshToken': req.session.token.token.refresh_token
      //'baseApiUri'  : 'https://api.sandbox.coinbase.com/v1/'
      });
    req.session.coinbase = cb;
    res.redirect('/');
  }

  var code = req.query.code;
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: config.REDIR_URL
  }, saveToken);
});

module.exports = router;

