var Picture = require('../models/Picture');
var fs = require('fs');

exports.uploadPicture = async(req, res) => {
  if (req.file) {
    const picture = await new Picture({path: req.file.path}).save()
    res.json(picture);
  } else {
    res.json({message: "no image"})
  }
}
exports.updatePicture = (req, res) => {
  Picture.findById(req.params.id, (err, pic) => {
    fs.unlink(pic.path);
  });
  Picture.update({
    _id: req.params.id
  }, {
    path: req.file.path
  }, (err, pic) => {
    if (err)
      res.send(err)
    res.json({message: 'image changed'})
  });
}
exports.listAll = (req, res) => {
  Picture.find({}, (err, pic) => {
    if (err)
      res.send(err);
    res.json(pic);
  });
}
exports.findPictureById = (req, res) => {
  console.log('getting one picture');
  Picture.findById(req.params.id, (err, pic) => {
    if (err)
      res.send(err);
    res.json(pic);
  });
}
