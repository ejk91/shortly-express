var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
//util.hasher(*insert variable*);
  var cookies = req.cookies.shortlyid;
  var sessionInstance = {};
  var newCookie = {};
  var id = 'shortlyid';
  var salt = new Date();
 // var sessionHash = userId + salt;



  console.log('req:', req.body);
  //if no cookies, check req.header.cookie
  if (!cookies) {
   // console.log(res.cookie(userId, util.hasher(sessionHash)));
    //res.cookie(id, util.hasher(sessionHash));    
  }

    // create cookie

  req.session = {};
  req.session.hash = '123';
};

module.exports = createSession;
