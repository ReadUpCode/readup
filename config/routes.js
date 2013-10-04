var items = require('../app/controllers/items');
var users = require('../app/controllers/users');
var tags = require('../app/controllers/tags');
var votes = require('../app/controllers/votes');

module.exports = function(app){
  app.post('/items', function(req,res){ items.create(req, res); });
  app.get('/items', function(req,res){ items.get(req, res); });
  app.get('/items/:id', function(req,res){ items.getOne(req, res); });

  app.post('/votes', function(req,res){ votes.create(req,res); });
  
  app.get('/users/:id/items', function(req,res){ users.getAllItemsForUser(req, res); });

  app.get('/tags', function(req, res){ tags.get(req, res); });
  app.get('/tags/:id/items', function(req, res){ tags.getAllItemsForTag(req, res); });


};