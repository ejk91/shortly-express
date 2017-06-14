var parseCookies = function(req, res, next) {
  var cookies = req.get('Cookie');
  /*
  this can be optimized using reduce instead of looping through each index

  var cookiesObj = {};
  if (cookies) {
    cookies = cookies.split('; ');
    cookies.forEach(function (cookie) {
      // console.log(typeof cookie);
      var split = cookie.split('=');
      // console.log(split);
      var id = split[0].toString();
      var hash = split[1].toString();

      cookiesObj[id] = hash;
    });
  }

  req.cookies = cookiesObj;
  console.log('Cookie', cookies);
  */

  req.cookies = cookies.split(';')
    .reduce((cookie, item) => {
      let parts = item.split('='); //finds string after equal
      if (parts.length > 1) {
        let key = parts[0].trim();
        let val = parts[1].trim();
        cookie[key] = val;
      }
      return cookie;
    }, {});


  next();
};

module.exports = parseCookies;