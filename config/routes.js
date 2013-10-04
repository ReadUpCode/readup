var items = require('../app/controllers/items');
module.exports = function(app){
  app.post('/items', function(req,res){ items.create(req, res); });
  app.get('/items', function(req,res){ items.get(req, res); });
  app.get('/items/:id', function(req,res){ items.getOne(req, res); });
  app.get('/users/:id/items', function(req,res){ items.getAllForUser(req, res); });
};