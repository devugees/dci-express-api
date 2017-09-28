const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')


// const userSchema   = new mongoose.Schema({
//     first_name: String,
//     last_name:  String,
//     user_email: String,
//     age:{type:Number,min:18,max:60}
// });

const userSchema = new mongoose.Schema({
  name: String,
  username: String, // <- this is the url
  avatar_url: String,
  github_url: String,
  website: String,
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
