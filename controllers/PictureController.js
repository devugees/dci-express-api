var Picture = require('../models/Picture');
exports.PictureController = function(req, res) {
  if (req.file) {
    var profilePic = new Picture();
    profilePic.path = req.file.path;
    console.log(req.file);
    profilePic.save(function(err,pic) {
      if (err)
        console.log("the error is " + err);
      res.json(pic);
    });
  }
}
