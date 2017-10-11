const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const contactSchema = new Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    trim: true,
    required: "Please supply an username"
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: "Please Supply an email address"
  },
  phone: {
    type: String
  },
  content: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", contactSchema);
