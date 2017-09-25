"use strict";

var mongoose = require("mongoose"),
	Post = mongoose.model("Post");


exports.list_all_posts = function(req, res) {
	Post.find({}, function(err, result) {
		if (err) res.send(err);
		res.json(result);

		console.log(result);
	});
};

/*exports.create_a_posts = function(req, res) {
	var new_post = new Post(req.body);
	new_post.save(function(error, result) {
		if (err) res.send(err);
		res.json(result);
	});
};*/
