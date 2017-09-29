var express    	    = require('express');
var app        	    = express();
var bodyParser 	    = require('body-parser');
var mongoose        = require('mongoose');
var session         = require('express-session');

var Category 		    = require("./models/Category.js");
var categoryRouters = require('./routes/categoryRouters');
var commentRoutes   = require('./routes/commentRoutes');
var pictureRoutes   = require('./routes/pictureRoutes');
var userRoutes      = require('./routes/userRouters');
var authRoutes      = require('./routes/authRoutes');
var passport        = require('passport')
var MongoStore      = require('connect-mongo')(session);

require('./passport.js');

require('dotenv').config({path: 'variables.env'});

const database = process.env.NODE_ENV === "test"
  ? process.env.TEST_DATABASE
  : process.env.DATABASE

// Database Section
mongoose.connect(database, {
  useMongoClient: true,
  promiseLibary: global.Promise
});

var db = mongoose.connection;
db.on('error', (err) => {
  console.error(`${err.message}`);
});

db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', function() {
  console.log('conection to database');
});

app.use(session({
  secret: "evil morty",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// http://www.passportjs.org/docs#middleware
app.use(passport.initialize());
app.use(passport.session());

// pre Middleware Section
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'))
// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

categoryRouters(app);
commentRoutes(app);
pictureRoutes(app);
userRoutes(app);
authRoutes(app);

// 404
app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
});

// App listens
app.listen(process.env.PORT, () => console.log('\x1b[33m%s\x1b[0m', `Express running → PORT ${process.env.PORT}`))

module.exports = app
