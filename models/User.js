const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', userSchema);
