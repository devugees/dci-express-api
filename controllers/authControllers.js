const passport = require('passport');

exports.login = passport.authenticate('github');

exports.authenticate = passport.authenticate('github', {
  failureRedirect: '/login'
});

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
