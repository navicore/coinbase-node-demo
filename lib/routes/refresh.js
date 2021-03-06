var express  = require('express'),
    Coinbase = require('coinbase').Client,
    router   = express.Router();

require('express-session');

router.get('/', function(req, res) {

  var cb = new Coinbase(req.session.coinbase); 

  cb.refresh(function(err) {
    if (err) { 
      var etype = err.type || 'unknown';
      var ecode = err.response
        ? err.response.statusCode 
        : 'unknown';
      res.status(ecode).send(etype);
      return;
    }
    req.session.coinbase = cb;

    res.json({success: true});
  });
});

module.exports = router;

