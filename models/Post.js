var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var postSchema = new Schema({
    post:String,
    author:String
});


module.exports = mongoose.model('Post', postSchema);;