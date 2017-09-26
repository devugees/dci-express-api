module.exports = function(app) {
  var multer = require('multer');
  var upload = multer({ dest:'./uploads'});
  var PictureController = require('../controllers/PictureController');



  app.route('/pictureUpload')
    .post( upload.single('profile'), PictureController.uploadPicture );

}
