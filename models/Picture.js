var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema({
  path:String
}) ;

module.exports = mongoose.model("Picture",PictureSchema);
