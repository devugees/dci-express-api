const { catchErrors } = require('../errorHandler');

module.exports = (app) => {
  const comment = require('../controllers/commentControllers')

  app.get('/api/comments', catchErrors(comment.showComments))
  app.post('/api/comments', catchErrors(comment.addComment))
  app.get('/api/comments/:item_id', catchErrors(comment.getComment))
  app.delete('/api/comments/:item_id', catchErrors(comment.removeComment))
  app.put('/api/comments/:item_id', catchErrors(comment.updateComment))
}
