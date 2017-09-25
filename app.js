var express    	    = require('express');
var app        	    = express();
var bodyParser 	    = require('body-parser');
var mongoose        = require('mongoose');
var Post 		    = require("./models/Post.js");
var postRoutes      = require('./routes/postRouters');
var commentRoutes   = require('./routes/commentRoutes');
var pictureRoutes   = require('./routes/pictureRoutes');

require('dotenv').config({ path: 'variables.env' });

// Database Section
mongoose.connect(process.env.DATABASE, {
    useMongoClient: true,
    promiseLibary: global.Promise
});

mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', function(){
	console.log('conection to database');
});


// pre Middleware Section
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

postRoutes(app);
commentRoutes(app);
pictureRoutes(app);

// 404
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// App listens
app.listen(process.env.PORT, () => console.log('\x1b[33m%s\x1b[0m', `Express running → PORT ${process.env.PORT}`))
