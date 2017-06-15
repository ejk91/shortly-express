var Sessions = require('../models/session');
var util = require('../lib/utility');
var Promise = require('bluebird');

//refractored to use promises

var createSession = function(req, res, next) {
  var agent = req.get('User-Agent') || util.createSalt();

  Promise.resolve(req.cookies.shortlyid)
    .then(function(token) {
      if (!token) {
        throw token;
      }
      return Sessions.getSession(req.cookies.shortlyid);
    })
    .then(function(session) {
      if (!session) {
        throw session;
      }
      // verify token; if invalid, throw to re-initialize it
      if (!util.compareHash(agent, session.hash, session.salt)) {
        return Sessions.destroySession(session.hash)
          .then(function() {
            throw agent;
          });
      }
      return session;
    })
    .catch(function() {
      return Sessions.initialize(agent)
        .then(function(session) {
          res.cookie('shortlyid', session.hash);
          return session;
        });
    })
    .then(function(session) {
      req.session = session;
      next();
    });
};


module.exports = createSession;
