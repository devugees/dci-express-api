var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =========================================================
var router = express.Router();

router.get('/',function(req,res) {
  res.json({message:'Welcome to our api'});
});





app.use('/api',router);

app.listen(port) ;
console.log("runnig on port "+ port)

// SETUP MongoDB
//======================================================================
var mongoose =  require('mongoose');
mongoose.connect('mongodb://instaMongo:express@ds143734.mlab.com:43734/insta_db', { useMongoClient: true, promiseLibrary: global.Promise });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {
  console.log('conected to database ');
});


var Picture    = require('./models/Picture');
