var items = require('../app/controllers/items');
module.exports = function(app){
  app.post('/items', function(req,res){items.create(req);});
};