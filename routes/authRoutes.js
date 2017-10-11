module.exports = (app) => {
  const auth = require('../controllers/authControllers')

  app.route('/login').get(auth.login)
  app.route('/logout').get(auth.logout)

  app.route('/gh').get(auth.authenticate, (req, res) => {
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo
  })
};
