var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    category:String
});

module.exports = mongoose.model('Category', categorySchema);
