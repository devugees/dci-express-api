const Comment = require('../models/Comment');

exports.showComments = async (req, res) => {
  const comments = await Comment.find()

  res.json(comments)
}

exports.addComment = async (req, res) => {

var commentLength = req.body.content.length
  if (commentLength <= 140) {

  const comment = await new Comment({content: req.body.content, pictureid: req.body.pictureid })

  res.json({ comment })

  }
  else {
    res.json({message :"Maximum limit exceeded" })
  }

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
