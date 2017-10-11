module.exports = function(app) {
  var multer = require('multer');
  var crypto = require('crypto');
  var path = require('path');
  require('dotenv').config({path: '.env'});
  const {catchErrors, isLoggedIn} = require('../helpers.js')
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
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
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

  const image = require('../controllers/PictureController');

  app.route('/upload')
    .get(isLoggedIn, image.showForm)

  app.route('/api/images')
    .get(catchErrors(image.listAll))
    .post(upload.single('path'), catchErrors(image.uploadPicture))

  app.route('/api/images/:id')
    .get(catchErrors(image.findPictureById))
    .put(upload.single('update'), catchErrors(image.updatePicture))



  // app.route('/pictureUpload/:id/comments').put(upload.single('update'), PictureController.uploadPicture).get(PictureController.findPictureByIdWithComments)
}
