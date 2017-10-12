const { catchErrors, isLoggedIn } = require('../helpers');

module.exports = (app) => {
  const contact = require('../controllers/contactControllers')

  app.route('/api/contact')
    .get(isLoggedIn, contact.showForm)
    .post(contact.validate, catchErrors(contact.saveContact));
}
