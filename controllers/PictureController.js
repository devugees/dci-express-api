const Picture = require('../models/Picture');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({path: '.env'});

// multer config for renaming files
const storage = multer.diskStorage({
  destination: process.env.UPLOADSFOLDER,
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err)
        return cb(err)

      cb(null, Date.now() + raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
// multer config for handling file extenions
const allowedExtension = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}
// multer settings


/*======= Upload Image Handler =========*/
exports.uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10485760
  },
  fileFilter: allowedExtension
}).single('image');
/*======== Save Image Handler ==============*/
exports.saveImage = async(req, res) => {
  req.body.path = req.file.path;
  req.body.author = req.user._id;

  const picture = await (new Picture(req.body)).save();

  res.redirect(`back`)
}

exports.handeUpdatedImage = async(req, res) => {
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
exports.findImageById = async(req, res) => {
  const picture = await Picture.findById(req.params.id);
  res.json(picture)

}
exports.findImageByIdWithComments = (req, res) => {
  Comment.find({
    "pictureid": req.params.id
  }, (err, comment) => {
    if (err)
      res.json(err);
    res.json(comment);
  });
}


exports.showForm = (req, res) => {
  res.render('upload', {title: 'upload'})
}
