//var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var config = {};

config = {};

config.CLIENT_ID = 
  process.env.CLIENT_ID || 'TEST_CLIENT_ID_123';

config.CLIENT_SECRET = 
  process.env.CLIENT_SECRET || 'TEST_CLIENT_SECRET_123';

config.REDIR_URL = 
  process.env.REDIR_URL || 'http://localhost:3000/callback';

config.redisStore = new RedisStore({
      host   : process.env.REDIS_HOST || '127.0.0.1',
      port   : process.env.REDIS_PORT || 6379,
      prefix : process.env.REDIS_PREFIX || 'sess'
});
config.useRedis = process.env.REDIS_HOST ? true : false;

module.exports = config;

