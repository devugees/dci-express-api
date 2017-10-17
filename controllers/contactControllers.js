const mongoose = require('mongoose');

const Contact = require('../models/Contact');

exports.showForm = (req, res) => {
  res.render('contact', {title: 'contact'})
}

exports.validate = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Please supply an name').notEmpty();

  req.checkBody('email', 'Invalid Email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_emove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  req.sanitizeBody('content');

  const errors = req.validationErrors();

  if (errors) return res.send(errors.map(err => err.msg))
  next();
}


exports.saveContact = async (req, res) => {
  if (req.user) {
    req.body.author = req.user._id;
  }
  const contact = await new Contact(req.body).save()

  res.redirect('back')
}
