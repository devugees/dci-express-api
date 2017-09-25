const express = require('express');
const test = require('./controllers/test');

const router = express.Router();

router.get('/api', test.testing);

module.exports = router;
