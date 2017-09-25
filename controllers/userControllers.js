const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.showUsers = async (req, res) => {
  const user = await User.find({})
  res.json(user)
}

exports.addUser = async (req, res) => {
  const name = req.params.name
  const user = await new User({ name }).save()
  res.json({ message: `User ${name} created` })
}

exports.findUser = async (req, res) => {
  const name = req.params.name
  const user = await User.findOne({ name })

  if (!user) {
    res.json({ error: 'user not found'})
  }
  else {
    res.json({ user })
  }
}

exports.removeUser = async (req, res) => {
  const name = req.params.name
  const user = await User.findOne({ name })

  user.remove()

  res.json({ message: `User ${name} was delete` })
}

exports.updateUser = async (req, res) => {
  const name = req.params.name
  const user = await User.findOneAndUpdate(
    { name },
    { $set: {name: req.params.newname }},
    { new: true }
  );

  res.json({ message: `User ${name} was changed` })
}
