var items = require('../app/controllers/items');
var users = require('../app/controllers/users');
var tags = require('../app/controllers/tags');
var votes = require('../app/controllers/votes');
var links = require('../app/controllers/links');
var everyauth = require('everyauth');
var everyauthConfig = require('./everyauthConfig.js');
var validation = require('../app/lib/validation');

module.exports = function(app){
  app.post('/_/items', function(req, res) {
    validation.validateURL(req, res, items.create);
  });
  app.post('/_/preview', links.getText);

  app.get('/_/items/:id', items.getOne);
  app.get('/_/items/:id/score', items.getScore);

  app.post('/_/votes', function(req, res){
    votes.updateKarma(req, res);
    votes.create(req, res);
  });

  app.post('/_/favorites', function(req,res){
    items.saveToFavorites(req,res);
  });

  app.get('/_/users/:username/saved', users.getAllSavedForUser);

  app.get('/_/users/:id/items', users.getAllItemsForUser);

  app.get('/_/users/:username/submitted', users.getAllSubmittedForUser);

  app.get('/_/tags', tags.get);

  app.get('/_/tags/:tagName/items/:page', tags.getAllItemsForTag);

  app.get('/:tagName', function(req, res){
    res.redirect('/#/' + req.params.tagName);
  });

  app.get('/_/loggedin/user', users.getLoggedInUser);

};
