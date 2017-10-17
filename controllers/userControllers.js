const User = require('../models/User');

exports.showUsers = async ( req , res ) => {
  const users = await User.find();
  res.json(users);
}

exports.addUser = async (req, res) => {
  const user = await new User({first_name:req.body.first_name,last_name:req.body.last_name,user_email:req.body.user_email,age:req.body.age}).save();
  res.json({user});
}

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
