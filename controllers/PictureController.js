var Picture = require('../models/Picture');
var fs = require('fs');

exports.uploadPicture = async(req, res) => {
  if (req.file) {
    console.log(req.file);
    const picture = await new Picture({path: req.file.path}).save()
    res.redirect('back');
  } else {
    res.json({message: "no image"})
  }
}
exports.updatePicture = async(req, res) => {
  const picture = await Picture.findById(req.params.id);
  fs.unlink(picture.path);
  Picture.update(picture, {path: req.file.bath});

  Picture.update({
    _id: req.params.id
  }, {
    path: req.file.path
  }, (err, pic) => {
    if (err)
      res.json(err)
    res.json({message: 'image changed'})
  });
}
exports.listAll = async(req, res) => {
  const pictures = await Picture.find().limit(10)
  res.json(pictures);

}
exports.findPictureById = async(req, res) => {
  const picture = await Picture.findById(req.params.id);
  res.json(picture)

}
exports.findPictureByIdWithComments = (req, res) => {
  Comment.find({
    "pictureid": req.params.id
  }, (err, comment) => {
    if (err)
      res.json(err);
    res.json(comment);
  });
}
