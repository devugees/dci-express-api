module.exports = function(app) {
  var multer = require('multer');
  var crypto = require('crypto');
  var path = require('path');
  require('dotenv').config({path: 'variables.env'});

  // multer config for renaming files
  var storage = multer.diskStorage({
    destination: process.env.UPLOADSFOLDER,
    filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err)
          return cb(err)

        cb(null, Date.now() + raw.toString('hex') + path.extname(file.originalname))
      })
    }
  });
// multer config for handling file extenions
  var allowedExtension = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'),false);
    }
    cb(null, true);
  }
// multer settings
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 10485760
    },
    fileFilter: allowedExtension
  });
  var PictureController = require('../controllers/PictureController');

  app.route('/pictureUpload').post(upload.single('profile'), PictureController.uploadPicture).get(PictureController.listAll);
  app.route('/pictureUpload/:id').put(upload.single('update'), PictureController.updatePicture).get(PictureController.findPictureById)
}
