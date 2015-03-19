var express  = require('express'),
    Coinbase = require('coinbase').Client,
    router   = express.Router();

require('express-session');

router.get('/', function(req, res) {

  var cb = new Coinbase(req.session.coinbase);
  cb.getAccounts(function(err, accounts) {
    if (err) { 
      var etype = err.type || 'unknown';
      var ecode = err.response
        ? err.response.statusCode 
        : 'unknown';
      res.status(ecode).send(etype);
      return;
    }
    //remove state not acct related (ie client)
    //why is toString not in array?
    res.json(JSON.parse('[' + accounts.toString() + ']')); 
  });
});

module.exports = router;

