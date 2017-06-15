var db = require('../db');
var util = require('../lib/utility');

let initializeSession = (agent) => {
  let salt = util.createSalt();
  let hash = util.createHash(agent, salt);

  let session = {
    hash: hash,
    salt: salt
  };

  let queryString = 'INSERT INTO sessions SET ?';

  return db.queryAsync(queryString, session)
    .then((result) => {
      session.id = result[0].insertId;
      return session;
    })
};

let getSession = (token) => {
  let queryString = 'SELECT * FROM sessions WHERE hash =?';

  return db.queryAsync(queryString, token)
    .then((results) => {
      let session = results[0][0];

      // if there is no session
      if (!session || !session.user_id) {
        return session
      } else {
      return db.queryAsync('SELECT username FROM users WHERE id = ?', session.user_id)
        .then((result) => {
          session.user = result[0][0];
          return session
        });
      }  
    });
};


let assignSession = (user, sessionHash) => {
  let queryString = 'UPDATE sessions SET user_id = ? WHERE hash = ?';
  return db.queryAsync(queryString, [user.id, sessionHash])
    .return(user);
}

let destroySession = (token) => {
  let queryString = 'DELETE FROM sessions WHERE hash = ?';
  return db.queryAsync(queryString, token);
}


module.exports = {
  initialize: initializeSession,
  getSession: getSession,
  assignSession: assignSession,
  destroySession: destroySession
};
