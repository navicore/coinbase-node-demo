var express   = require('express'),
    Coinbase = require('coinbase').Client,
    router    = express.Router();

require('express-session');

router.get('/', function(req, res) {

  var cb = new Coinbase(req.session.coinbase);
  cb.getContacts(null, null, null, function(err, contacts) {
    if (err) { 
      var etype = err.type || 'unknown';
      var ecode = err.response
        ? err.response.statusCode 
        : 'unknown';
      res.status(ecode).send(etype);
      return;
    }
    res.json(contacts);
  });
});

module.exports = router;


