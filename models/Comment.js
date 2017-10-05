const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'Your comment must have text!'
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  image: {
    type: mongoose.Schema.ObjectId,
    ref: 'Picture',
    required: 'You must supply an image!'
  }
});

function autopopulate(next) {
  this.populate('author');
  next();
}
commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Comment', commentSchema)
