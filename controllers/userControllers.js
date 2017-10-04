const User = require('../models/User');
const Picture = require('../models/Picture');

const { siteName } = require('../helpers')

exports.showUsers = async (req, res) => {
  const profiles = await User.find()
    .sort({ created: -1 })
    .limit(12)

  res.render('home', {
    title: `${siteName} | Home`,
    profiles:  req.user && profiles.filter(p => !p.username.includes(req.user.username))
  });
}

exports.showProfile = async(req, res) =>{
  const profile = await User.findOne({ username: req.params.username });

  if (!profile) return res.json({message: `${req.params.username} not found`})

  const images = await Picture.find({ author: profile._id })
      .sort({ created: 'desc' })
      .limit(12)
      .populate('comments');

  res.render('profile', { title:
    `${siteName} | ${profile.username}`,
    images,
    profile
  });
}

exports.removeUser = async (req,res)=> {
const user = await User.findOne({_id:req.params.user_id})
user.remove();

res.json({message:'user deleted'});

}

exports.updateUser = async (req, res) =>{
  const user = await User.findOneAndUpdate(
    {_id:req.params.user_id},
    {$set:{first_name:req.body.first_name}},
    {new:true}
  );

  const message = {error : "user not found"};

  res.json(!user ? message : user);
}
