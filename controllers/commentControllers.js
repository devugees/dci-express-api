const Comment = require('../models/Comment');

exports.showComments = async (req, res) => {
  const comments = await Comment.find()

  res.json(comments)
}

exports.addComment = async (req, res) => {
  const comment = await new Comment({ comment: req.body.comment }).save()

  res.json({ comment })
}

exports.getComment = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.item_id})

  const message =  { error: 'comment not found' }

  res.json(!comment ? message : comment)
}

exports.removeComment = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.item_id})
  comment.remove()

  res.json({ message: `Message deleted` })
}

exports.updateComment = async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.item_id},
    { $set: { comment: req.body.comment }},
    { new: true }
  )

  const message =  { error: 'comment not found' }

  res.json(!comment ? message : comment)
}
