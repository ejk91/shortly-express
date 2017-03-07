var db = require('../db');
var utils = require('../lib/utility');
var bodyParser = require('body-parser');
var express = require('express');

var addUser = function(users, password, callback) {
  var queryString = 'INSERT INTO users SET ?';
  var user = { username: users, password: password };

  db.query(queryString, user, function(err, results, fields) {
    if (err) {
      callback(err);
    } else {
      callback(results);
    }
  });
};

// var app = express();
// app.use(bodyParser.json());

// app.get('/links', function(req, res) {
  
// });

// app.post('/links', function(req, res) {
//   //we receive a username and password
//   //it will either insert or will throw an error due to duplications
//   //call back database, check to see if username is within users database
//   //if it is, then we tell the user they must choose a new username, throw error

//   console.log(req, body);
//   console.log('post ' + req.body.username + ' ' + req.body.password);

// });

// app.options('', function(req, res) {

// });


// Write you user database model methods here

module.exports = { 
  addUser: addUser

};
