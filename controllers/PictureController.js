var Picture = require('../models/Picture');
exports.uploadPicture = function(req, res) {
  if (req.file) {
    var profilePic = new Picture();
    profilePic.path = req.file.path;
    profilePic.save(function(err,pic) {
      if (err)
        console.log("the error is " + err);
      res.json(pic);
    });
  }
}
