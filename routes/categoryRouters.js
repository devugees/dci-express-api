'use strict';

module.exports = function(app){
  var category= require('../controllers/categoryControllers');

  app.route('/api/category')
    .get(category.list_all_Categorys)
   // .post(category.create_a_Category);

  app.route('/api/category/:CategoryId')
  //  .put(category.update_a_Category)
 //   .delete(category.delete_a_Category)
    .get(category.read_a_Category);
 
};
