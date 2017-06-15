var db = require('../db');
var utils = require('../lib/utility');
var bodyParser = require('body-parser');
var express = require('express');

/*
var addUser = function(users, password, callback) {
  var queryString = 'INSERT INTO users SET ?';
  var user = { username: users, password: password };

  db.query(queryString, user, function(err, results, fields) {
    if (err) {
      // console.log('ERROR');
      callback(err, null);
    } else {
      // console.log('RESULTS');
      callback(null, results);
    }
  });
};

var checkUser = function(username, callback) {
  var queryString = 'SELECT username, password FROM users WHERE username = "' + username + '"';

  db.query(queryString, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      //console.log('database' + results);
      // console.log('fred:' + JSON.stringify(results));
      callback(null, results);

    }
  });
};
*/

// REFRACTOR TO ES6

let addUser = (user) => {
  let timestamp = Date.now();
  let salt = utils.createSalt(timestamp);

  let newUser = {
    username: user.username,
    passworld: utils.createHash(user.password, salt),
    salt: salt
  };

  let queryString = 'INSERT INTO users SET ?';
  return db.queryAsync(queryString, newUser)
    .then((results) => {
      let obj = {
        id: results[0].insertId,
        username: newUser.username
      };
      return obj;
    });
};

let checkUser = (username) => {
  //returns user id
  let queryString = 'SELECT * FROM users WHERE username = ?';

  return db.queryAsync(queryString, username)
    .then((results) =>{
      return results[0][0];
    });
};

module.exports = { 
  addUser: addUser,
  checkUser: checkUser
};
