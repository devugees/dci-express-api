var express    	= require('express');        
var app        	= express();               
var bodyParser 	= require('body-parser');
var db 			= require("./config/mongoose/database.js");
var Post 		= require("./models/Post.js");
var postRoutes = require('./routes/postRouters');

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  

app.get('/', function(req, res) {
	
    res.json({ message: 'hooray! welcome to our api!' });   
});

 postRoutes(app);



console.log('Magic happens on port ' + port);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', function(){
	console.log('conection to database');
});


app.listen(port);