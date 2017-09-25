'use strict';

module.exports = function(app){
var post = require('../controllers/postControllers');

app.route('/post')
.get(post.list_all_posts)
.post(post.create_a_post);

app.route('/post/:postId')
.put(post.update_a_post)
.delete(post.delete_a_post)
.get(post.read_a_post);

};

