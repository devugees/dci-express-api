const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const commentSchema = new mongoose.Schema({
  comment: String,
  created: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Comment', commentSchema)
