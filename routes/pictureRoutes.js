module.exports = function(app) {
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');
var storage = multer.diskStorage({
destination: './uploads/',
filename: function (req, file, cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    if (err) return cb(err)

    cb(null, Date.now() + raw.toString('hex') +  path.extname(file.originalname))
  })
}
})

  var upload = multer({ storage:storage,limits: { fileSize: 10485760 }});
  var PictureController = require('../controllers/PictureController');



  app.route('/pictureUpload')
    .post( upload.single('profile'), PictureController.uploadPicture)
    .get(PictureController.listAll);
  app.route('/pictureUpload/:id')
  .put(upload.single('update'),PictureController.updatePicture)
}
