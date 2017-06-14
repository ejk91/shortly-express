var Promise = require('bluebird');

module.exports = function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table -shorten websites
  return db.queryAsync('CREATE TABLE IF NOT EXISTS links (\
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
    url VARCHAR(255),\
    baseUrl VARCHAR(255),\
    code VARCHAR(5),\
    title VARCHAR(255),\
    visits INT NOT NULL DEFAULT 0,\
    timestamp TIMESTAMP\
    );')
  .then(function() {
    // Create clicks table // tells us the timestamp of each click for a link
    return db.queryAsync('CREATE TABLE IF NOT EXISTS clicks (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      linkId INT,\
      timestamp TIMESTAMP\
      );');
  }).then(function() {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS cookie (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      sessionKey VARCHAR(255)\
      );');
  }).then(function () {
    return db.queryAsync( 'CREATE TABLE IF NOT EXISTS users (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      username VARCHAR(255) UNIQUE KEY,\
      password VARCHAR(255),\
      salt VARCHAR(255), \
      timestamp TIMESTAMP\
      );');
  }).then(function () {
    return db.queryAsync( 'CREATE TABLE IF NOT EXISTS sessions (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      hash VARCHAR(255) UNIQUE KEY,\
      salt VARCHAR(255), \
      user_id INT,\
      timestamp TIMESTAMP\
      );');
  })
  /************************************************************/
  /*          Add additional schema queries here              */
  /************************************************************/

  .error(function(err) {
    console.log(err);
  });
};


// FOREIGN KEY (cookieID) REFERENCES cookie(id)
      // salt VARCHAR(255),\
      // cookieID INT\