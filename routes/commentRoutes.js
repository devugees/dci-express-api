const { catchErrors } = require('../helpers');

module.exports = (app) => {
  const comment = require('../controllers/commentControllers')

  app.route('/api/comments')
    .get(catchErrors(comment.showComments))
    .post(catchErrors(comment.addComment));

  app.route('/api/comments/:item_id')
    .get(catchErrors(comment.getComment))
    .delete(catchErrors(comment.removeComment))
    .put(catchErrors(comment.updateComment));

}
