'use strict';
exports.site = process.env.NODE_ENV === development ? 'http://localhost:8080' : 'https://dci-express-api.herokuapp.com'

exports.siteName = 'InstaAPI'

// Used to view information in the views
exports.show = obj => JSON.stringify(obj, null, 2);

// Remove the test database before testing
exports.removeDB = (db) => {
  before(async () => {
    await db.remove();
    console.log(`\n\n\t😢 Goodbye test ${db.modelName}s 😢\n\n`);
  })
}

// Errors Handler
// With async/await we need some way to catch errors.
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// Simple route middleware to ensure that the user is authenticated.
// Use this middleware on any resource that needs to be protected.
// If the request is authenticated, the request will proceed.
// Otherwise, the user will be redirected to the login page.

// Example: I can remove an image only if I am logged in.
// app.route('/api/...')
//    .delete(isLoggedIn, catchErrors(img.removeImage))
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.session.returnTo = req.path
  res.redirect('/login');
}
