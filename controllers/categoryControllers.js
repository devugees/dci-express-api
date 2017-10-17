"use strict";

var mongoose = require("mongoose"),
	Category = mongoose.model("Category");

exports.list_all_Categorys = function(req, res) {
	Category.find({}, function(err, result) {
		if (err) res.send(err);
		res.json(result);

	});
};
exports.read_a_Category = function(req, res) {
	Category.findById(req.params.CategoryId, function(err, result) {
		if (err) res.send(err);
		res.json(result);
	});
};
/*exports.create_a_Category = function(req, res) {
	var new_Category = new Category({category:req.body.category});
	new_Category.save(function(err, result) {
		if (err)
		 res.send(err);
		res.json(result);
	});
};

exports.update_a_Category = function(req, res){
	Category.findOneAndUpdate({
		_id: req.params.CategoryId
	},
	 req.body, {new:true}, function(err, result){
		if(err)
			res.send(err);
		res.json(result);
	});
};

exports.delete_a_Category = function(req, res){
	Category.remove({
		_id:req.params.CategoryId
	}, function(err, result){
		if (err)
			res.send(err);
		res.json({message:'Category successfully delete'});

	});
};
*/
