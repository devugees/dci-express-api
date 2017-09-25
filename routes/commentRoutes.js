const { catchErrors } = require('../errorHandler');
const express = require('express');
const router = express.Router();

const comment = require('../controllers/commentControllers')

router.get('/api', catchErrors(comment.showComments))

router.post('/api/add', catchErrors(comment.addComment))



module.exports = router;
