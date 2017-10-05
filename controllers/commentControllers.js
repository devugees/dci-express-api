const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  if (req.body.content.length > 140) return req.json({message: "Maximum limit exceeded"})

  req.body.author = req.user._id
  req.body.image = req.params.image

  const comment = await new Comment(req.body).save()
  res.redirect('back')
}


exports.removeComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (comment.author._id.toString() !== req.user._id.toString()) {
    res.json({message: `You can't remove that comment.`})
    return;
  }

  await comment.remove()
  res.redirect('back')
}


exports.showComments = async (req, res) => {
  const comments = await Comment.find()

  res.json(comments)
}

exports.getComment = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.item_id})

  const message =  { error: 'comment not found' }

  res.json(!comment ? message : comment)
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
