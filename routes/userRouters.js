const { catchErrors } = require('../helpers');

module.exports = (app) => {
  const user = require('../controllers/userControllers')

  app.route('/api/user')
  .get(catchErrors(user.showUsers))
  .post(catchErrors(user.addUser));

  app.route('/api/user/:user_id')
  .get(catchErrors(user.getUser))
  .delete(catchErrors(user.removeUser))
  .put(catchErrors(user.updateUser));
};
