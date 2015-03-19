var express  = require('express'),
    Coinbase = require('coinbase').Client,
    Account  = require('coinbase').model.Account,
    router   = express.Router();

require('express-session');

router.get('/:id/balance', function(req, res) {

  var cb = new Coinbase(req.session.coinbase);
  var account = new Account(cb, {'id': req.params.id});
  account.getBalance(function(err, bal) {
    if (err) { 
      var etype = err.type || 'unknown';
      var ecode = err.response
        ? err.response.statusCode 
        : 'unknown';
      res.status(ecode).send(etype);
      return;
    }
    res.json(bal);
  });
});

module.exports = router;

