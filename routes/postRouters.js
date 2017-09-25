'use strict';

module.exports = function(app){
var post = require('../controllers/postControllers');

app.route('/post')
.get(post.list_all_posts)
//.post(post. create_a_posts);
};