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
// Use this middleware on any route that demands a logged user.
// If the request is authenticated the request will proceed.
// Otherwise, the user will be redirected to the login page.

// Example:
// Only an authenticated user should be able to remove an Image.
// app.route('/api/...')
//  .delete(helper.isLoggedIn, catchErrors(img.removeImage))
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/login');
}
