module.exports = function(app) {
const {catchErrors, isLoggedIn} = require('../helpers.js');

  const image = require('../controllers/PictureController');

  app.route('/upload')
    .get(isLoggedIn, image.showForm)

  app.route('/api/images')
    .get(catchErrors(image.listAll))
    .post(image.uploadImage,
      catchErrors(image.saveImage))

  app.route('/api/images/:id')
    .get(catchErrors(image.findImageById))
    .put(image.uploadImage,
      catchErrors(image.handeUpdatedImage))



  // app.route('/pictureUpload/:id/comments').put(upload.single('update'), PictureController.uploadPicture).get(PictureController.findPictureByIdWithComments)
}
