const User = require('../models/User');
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

// ===== We won't add local users, that is managed by Passport and GitHub
/*
exports.addUser = async (req, res) => {
  const user = await new User({first_name:req.body.first_name,last_name:req.body.last_name,user_email:req.body.user_email,age:req.body.age}).save();
  res.json({user});
}
*/
exports.getUser = async(req, res) =>{
const user = await User.findOne({_id: req.params.user_id});

const message = {error : "user not found"};

res.json(!user ? message : user)
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
