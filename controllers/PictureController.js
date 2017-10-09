var Picture = require('../models/Picture');
var fs = require('fs');

exports.uploadPicture = async(req, res) => {
  if (req.file) {
    console.log(req.file);
    const picture = await new Picture({path: req.file.path}).save()
    res.json(picture);
  } else {
    res.json({message: "no image"})
  }
}
exports.updatePicture = async(req, res) => {
  const picture = await  Picture.findById(req.params.id);
    fs.unlink(picture.path);
    Picture.update(picture,{path:req.file.bath})
  /**/Picture.update({
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
exports.findPictureByIdWithComments = (req, res) => {
  console.long('geting the comments to a picture');
  Comment.find({"pictureid": req.params.id},(err,comment)=>{
    if (err)
      res.send(err);
    res.json(comment);
      });
}
