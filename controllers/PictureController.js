var Picture = require('../models/Picture');
var fs = require('fs');

exports.showForm = async (req, res) => {
  res.render('upload', {title: 'upload'})
}

exports.uploadPicture = async(req, res) => {
  req.body.path = req.file.path.split("/").slice(-1)[0]
  req.body.author = req.user._id;

  const picture = await (new Picture(req.body)).save();

  res.redirect(`back`)
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
