var express = require('express');
var app = express();
var mongoose = require('mongoose');
var pictureRoutes = require('./routes/pictureRoutes');



mongoose.connect('mongodb://instaMongo:express@ds143734.mlab.com:43734/insta_db', { useMongoClient: true, promiseLibrary: global.Promise });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {
  console.log('conected to database ');
});



var port = process.env.PORT || 8080;


app.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});



pictureRoutes(app)
app.listen(port) ;
console.log("Runnig on port  "+ port)
