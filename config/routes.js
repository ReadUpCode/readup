var items = require('../app/controllers/items');
module.exports = function(app){
  // app.post('/items', items.create);
  app.post('/items', function(req,res){items.create(req);});
};