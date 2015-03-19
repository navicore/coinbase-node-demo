var express = require('express');
var router = express.Router();

/* GET home page. */
/*jslint unparam:true*/
router.get('/', function(req, res, next) {
  res.render('index', {
    loggedIn  : req.session.hasOwnProperty('token'),
    title     : 'Coinbase Demo',
    oauthServ : 'Coinbase',
    message   : 'Logged In via OAuth2'
  });
});
/*jslint unparam:false*/

module.exports = router;
