var express    	    = require('express');
var app        	    = express();
var bodyParser 	    = require('body-parser');
var mongoose        = require('mongoose');
var session         = require('express-session');
var expressValidator = require('express-validator');
var path            = require('path');

var Category 		    = require("./models/Category.js");
var categoryRouters = require('./routes/categoryRouters');
var commentRoutes   = require('./routes/commentRoutes');
var pictureRoutes   = require('./routes/pictureRoutes');
var userRoutes      = require('./routes/userRouters');
var authRoutes      = require('./routes/authRoutes');
var contactRoutes   = require('./routes/contactRoutes');
var passport        = require('passport')
var MongoStore      = require('connect-mongo')(session);
var helpers         = require('./helpers');

require('./passport.js');

require('dotenv').config({path: '.env'});

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

app.use(session({
  secret: "evil morty",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// http://www.passportjs.org/docs#middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  next();
});


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
contactRoutes(app);

// 404
app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
});

// App listens
app.listen(process.env.PORT, () => console.log('\x1b[34m%s\x1b[0m', `\n\n\t Express running → PORT ${process.env.PORT}\n\n`))

module.exports = app
