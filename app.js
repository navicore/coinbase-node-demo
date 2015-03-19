var express           = require('express'),
    session           = require('express-session'),
    config            = require('./config.js'),
    Coinbase          = require('coinbase').Client,
    path              = require('path'),
    favicon           = require('serve-favicon'),
    logger            = require('morgan'),
    log4js            = require("log4js"),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    authorization_uri = require('./lib/oauth2Util').authorization_uri,

    routes            = require('./lib/routes/index'),
    refresh           = require('./lib/routes/refresh'),
    logout            = require('./lib/routes/logout'),
    accounts          = require('./lib/routes/accounts'),
    account           = require('./lib/routes/account'),
    balance           = require('./lib/routes/balance'),
    transactions      = require('./lib/routes/transactions'),
    transfers         = require('./lib/routes/transfers'),
    contacts          = require('./lib/routes/contacts'),
    oauthCb           = require('./lib/routes/callback'),
    currencies        = require('./lib/routes/currencies'),
    rates             = require('./lib/routes/rates'),

    app               = express();

// view engine setup
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/src/images/favicon.ico'));
app.use(logger('dev'));

//SESSION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var sessCfg = {
  secret: 'rusty is a cowboy'
};
if (config.useRedis) {
  log4js.getLogger().info('with redis');
  sessCfg.store = config.redisStore;
}
app.use(session(sessCfg));

// ROUTES
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/'           , routes);
app.use('/callback'   , oauthCb);
app.use('/refresh'    , refresh);
app.use('/logout'     , logout);
app.use('/accounts'   , accounts);
app.use('/account'    , account);
app.use('/account'    , balance);
app.use('/account'    , transactions);
app.use('/account'    , transfers);
app.use('/contacts'   , contacts);
app.use('/currencies' , currencies);
app.use('/rates'      , rates);

/*jslint unparam:true*/
app.get('/login', function (req, res) {
    res.redirect(authorization_uri);
});
/*jslint unparam:false*/

// catch 404 and forward to error handler
/*jslint unparam:true*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*jslint unparam:false*/

// error handlers

// development error handler
// will print stacktrace
/*jslint unparam:true*/
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
/*jslint unparam:false*/

// production error handler
// no stacktraces leaked to user
/*jslint unparam:true*/
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/*jslint unparam:false*/

module.exports = app;

