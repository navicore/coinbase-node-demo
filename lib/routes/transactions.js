var express  = require('express'),
    Coinbase = require('coinbase').Client,
    Account  = require('coinbase').model.Account,
    _        = require('lodash'),
    router   = express.Router();

require('express-session');

router.get('/:id/transactions', function(req, res) {

  var cb = new Coinbase(req.session.coinbase);
  var account = new Account(cb, {'id': req.params.id});
  account.getTransactions(null, null, function(err, txns) {
    if (err) { 
      var etype = err.type || 'unknown';
      var ecode = err.response
        ? err.response.statusCode 
        : 'unknown';
      res.status(ecode).send(etype);
      return;
    }
    res.json(_.map(txns, function(txn) {
      return txn.getProps();
    }));
  });
});

module.exports = router;

