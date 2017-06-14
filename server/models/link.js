var crypto = require('crypto');
var db = require('../db');

var getAll = function() {
  var queryString = 'SELECT * FROM links';
  return db.queryAsync(queryString);
};

var getOne = function(query) {
  var queryString = 'SELECT * FROM links WHERE ' + query.type + ' = ?';
  
  return db.queryAsync(queryString, query.data)
    .then(function(results) {
      var link = results[0][0];
      return link;
    });
};

var addOne = function(link) {
  var queryString = 'INSERT INTO links SET ?';

  var shasum = crypto.createHash('sha1');
  shasum.update(link.url);
  link.code = shasum.digest('hex').slice(0, 5);

  return db.queryAsync(queryString, link);
};

var incrementVisit = function(link) {
  var currentCount = link.visits;
  var queryString = 'UPDATE links SET visits = ? WHERE id = ?';

  return db.queryAsync(queryString, [currentCount + 1, link.id]);
};

module.exports = {
  getAll: getAll,
  addOne: addOne,
  getOne: getOne,
  incrementVisit: incrementVisit
};
