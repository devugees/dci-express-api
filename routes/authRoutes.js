module.exports = (app) => {
  const auth = require('../controllers/authControllers')

  app.route('/login').get(auth.login)
  app.route('/gh').get(auth.authenticate)
  app.route('/logout').get(auth.logout)
};
