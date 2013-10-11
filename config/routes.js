var items = require('../app/controllers/items');
var users = require('../app/controllers/users');
var tags = require('../app/controllers/tags');
var votes = require('../app/controllers/votes');
var links = require('../app/controllers/links');
var everyauth = require('everyauth');
var everyauthConfig = require('./everyauthConfig.js');

module.exports = function(app){
  app.post('/_/items', function(req,res){ items.create(req, res); });
  app.post('/_/preview', function(req, res) { links.getText(req, res); });

  app.get('/_/items', function(req,res){ items.get(req, res); });
  app.get('/_/items/:id', function(req,res){ items.getOne(req, res); });
  app.get('/_/items/:id/score', function(req,res){ items.getScore(req, res); });

  app.post('/_/votes', function(req,res){ votes.create(req,res); });

  app.get('/_/users/:id/items', function(req,res){ users.getAllItemsForUser(req, res); });

  app.get('/_/tags', function(req, res){ tags.get(req, res); });

  app.get('/_/tags/:tagName/items', function(req, res) { tags.getAllItemsForTag(req, res); });

  app.get('/:tagName', function(req, res){
    res.redirect('/#/' + req.params.tagName);
  });

  app.get('/_/loggedin/user', users.getLoggedInUser);

};
