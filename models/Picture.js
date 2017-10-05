var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema({
    path: String,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    caption: {
      type: String,
      trim: true
    },
    created: {
      type: Date,
      default: Date.now
    }
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtual: true
  }
});

PictureSchema.virtual('comments', {
  ref: 'Comment', // what model to link?
  localField: '_id', // which field on the Image schema?
  foreignField: 'image' // which field on the Comment schema?
});

module.exports = mongoose.model("Picture", PictureSchema);
