const { catchErrors } = require('../helpers');

module.exports = (app) => {
  const user = require('../controllers/userControllers')

  app.route('/').get(catchErrors(user.showUsers))

  app.route('/:username').get(catchErrors(user.showProfile))

  app.route('/api/user/:user_id')
  .delete(catchErrors(user.removeUser))
  .put(catchErrors(user.updateUser));
};
