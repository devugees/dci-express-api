'use strict';
const {catchErrors} = require('../helpers');


module.exports = function(app){
  var category= require('../controllers/categoryControllers');

  app.route('/category')
    .get(catchErrors(category.list_all_Categories));
   // .post(category.create_a_Category);

  app.route('/category/:CategoryId')
  //  .put(category.update_a_Category)
 //   .delete(category.delete_a_Category)
    .get(catchErrors(category.read_a_Category));
 
};
