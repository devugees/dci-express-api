const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  content: String,
  pictureid: { 
    type: mongoose.Schema.ObjectId,
    ref: 'Image',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)
							
