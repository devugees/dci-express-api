var express = require('express');
var app = express();
var multer = require('multer');
var path = require('path');
var upload = multer({ dest:'./uploads'});
var mongoose = require('mongoose');

var mongoose =  require('mongoose');
mongoose.connect('mongodb://instaMongo:express@ds143734.mlab.com:43734/insta_db', { useMongoClient: true, promiseLibrary: global.Promise });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {
  console.log('conected to database ');
});
    var Picture = mongoose.model('Picture', { path: String });

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =========================================================
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/',function(req,res) {
  res.send({message:'welcome to out api'});
});

router.post('/pic', upload.single('profile'), function(req, res) {
  if (req.file) {
    console.log(typeof(req.file.path));

    var profilePic = new Picture();

    profilePic.path = req.file.path;
    console.log(profilePic);
    profilePic.save(function(err) {
      if (err) {
        console.log("the error is " + err);
      }else {
        res.end('Thanks for the file');
      }
    });

  }
  res.end('Missing file');
});


app.use('/upload', router);

app.listen(port) ;
console.log("runnig on port  "+ port)

// SETUP MongoDB
//======================================================================
