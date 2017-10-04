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
  toJSON: {
    virtual: true
  }
});
PictureSchema.virtual('members', {
  ref: 'Comment', // The model to use
  localField: 'comment', // Find people where `localField`
  foreignField: 'Picture', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});
module.exports = mongoose.model("Picture", PictureSchema);
