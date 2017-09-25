const { catchErrors } = require('../errorHandler');

module.exports = function(app) {
    const comment = require('../controllers/commentControllers')

    app.get('/api', catchErrors(comment.showComments))

    app.post('/api/add', catchErrors(comment.addComment))

}
