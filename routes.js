const express = require('express');
const userController = require('./controllers/userControllers');

const { catchErrors } = require('./errorHandler');

const router = express.Router();

router.get('/api/users', catchErrors(userController.showUsers));

router.post('/api/add/:name', catchErrors(userController.addUser))

router.get('/api/find/:name', catchErrors(userController.findUser))

router.delete('/api/remove/:name', catchErrors(userController.removeUser))

router.post('/api/update/:name/:newname', catchErrors(userController.updateUser))

module.exports = router;
