const mongoose     = require('mongoose');


const userSchema   = new mongoose.Schema({
    first_name: String,
    last_name:  String,
    user_email: String,
    age:{type:Number,min:18,max:60}
});

module.exports = mongoose.model('User', userSchema);
