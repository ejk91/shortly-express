var parseCookies = function(req, res, next) {
  var cookies = req.headers.cookie;
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

  // console.log(cookies);
  req.cookies = cookiesObj;
  next();
  console.log(cookiesObj);
  console.log(req.cookies);

};

module.exports = parseCookies;