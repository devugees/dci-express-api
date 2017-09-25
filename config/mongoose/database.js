
const mongoose = require('mongoose');

mongoose.connect('mongodb://instaMongo:express@ds143734.mlab.com:43734/insta_db');

module.exports = mongoose.connection;