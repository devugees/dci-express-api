const {catchErrors, isLoggedIn} = require('../helpers.js')

module.exports = (app) => {
  const comment = require('../controllers/commentControllers')

  app.route('/c/:image')
    .post(
      isLoggedIn,
      catchErrors(comment.addComment)
    )

  app.route('/c/:id')
    .get(
      isLoggedIn,
      (catchErrors(comment.removeComment))
    )

  app.route('/api/comments')
    .get(catchErrors(comment.showComments))

  app.route('/api/comments/:item_id')
    .get(catchErrors(comment.getComment))
    .put(catchErrors(comment.updateComment));

}
