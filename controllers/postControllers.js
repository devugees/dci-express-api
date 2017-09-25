"use strict";

var mongoose = require("mongoose"),
	Post = mongoose.model("Post");


exports.list_all_posts = function(req, res) {
	Post.find({}, function(err, result) {
		if (err)
		 res.send(err);
		res.json(result);

		console.log(result);
	});
};

exports.create_a_post = function(req, res) {
	var new_post = new Post(req.body);
	new_post.save(function(err, result) {
		if (err)
		 res.send(err);
		res.json(result);
	});
};

exports.update_a_post = function(req, res){
	Post.findOneAndUpdate({
		_id: req.params.postId
	},
	 req.body, {new:true}, function(err, result){
		if(err)
			res.send(err);
		res.json(result);
	});
};

exports.delete_a_post = function(req, res){
	Post.remove({
		_id:req.params.postId
	}, function(err, result){
		if (err)
			res.send(err);
		res.json({message:'Post successfully delete'});

	});
};

exports.read_a_post = function(req, res){
	Post.findById(req.params.postId, function(err, result){
		if(err)
			res.send(err);
		res.json(result);
	
	});
};

