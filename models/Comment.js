const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  content: String,
  pictureid: String,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)
							
