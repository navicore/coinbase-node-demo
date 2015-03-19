var express  = require('express'),
    Coinbase = require('coinbase').Client,
    router   = express.Router();

require('express-session');

router.get('/', function(req, res) {

    delete req.session.token;

    res.json({success: true});
});

module.exports = router;

