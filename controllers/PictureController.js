var Picture = require('../models/Picture');
var fs = require('fs');

exports.uploadPicture = (req, res) => {
  if (req.file) {
    console.log(req.file);
    var profilePic = new Picture({path: req.file.path});
    profilePic.save((err, pic) => {
      if (err)
        console.log("the error is " + err);
      res.json(pic);
    });
  }
}
exports.updatePicture = (req, res) => {
  console.log("updating")
  Picture.findById(req.params.id, (err, pic) => {
    fs.unlink(pic.path)
  })
  Picture.update({
    _id: req.params.id
  }, {
    path: req.file.path
  }, (err, pic) => {
    if (err)
      res.send(err);
    res.json(pic);
  })
}
exports.listAll = (req, res) => {
  Picture.find({}, (err, pic) => {
    if (err)
      res.send(err);
    res.json(pic);
  });
}
