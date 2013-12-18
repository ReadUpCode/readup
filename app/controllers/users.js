var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;
var https = require('https');

var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var Category = db.Category;
var Favorites = db.Favorites;

exports.getAllItemsForUser = function(req, res){
  User.findAll({include: [Item], where: {id: req.params.id } }).success(function(items){
    res.send(items);
  });
};

exports.getAllSavedForUser = function(req, res){
  console.log(req.params.username);
  User.find({where: {username: req.params.username} }).success(function(user) {
    Favorites.findAll({include: [Item], where: {UserId: user.id} }).success(function(saves) {
      var responses = [];

      if (saves.length) {
        for (var i = 0; i < saves.length; i++) {
          Item.find({include: [Tag, Category], where:{id: saves[i].selectedValues.id}}).success(function(singleItem) {
            var resItem = {};
            resItem = singleItem.selectedValues;
            resItem.tags = [];
            resItem.categories = [];
            for (var k=0; k < singleItem.tags.length; k++) {
              resItem.tags.push(singleItem.tags[k].selectedValues);
            }
            for (k=0; k < singleItem.categories.length; k++) {
              resItem.categories.push(singleItem.categories[k].selectedValues);
            }
            responses.push(resItem);
            if(responses.length === saves.length){
              res.send(responses);
            }
          });
        }
      } else {
        res.send([{title: "No items found."}]);
      }
    });
  });
};

exports.getAllSubmittedForUser = function(req, res){
  User.find({where:{username: req.params.username} }).success(function(user) {
    Item.findAll({where: {UserId: user.selectedValues.id} }).success(function(items) {
      var responses = [];

      if (items.length) {
        for (var i = 0; i < items.length; i++) {
          Item.find({include: [Tag, Category], where:{id: items[i].selectedValues.id}}).success(function(singleItem) {
            var resItem = {};
            resItem = singleItem.selectedValues;
            resItem.tags = [];
            resItem.categories = [];
            for (var k=0; k < singleItem.tags.length; k++) {
              resItem.tags.push(singleItem.tags[k].selectedValues);
            }
            for (k=0; k < singleItem.categories.length; k++) {
              resItem.categories.push(singleItem.categories[k].selectedValues);
            }
            responses.push(resItem);
            if(responses.length === items.length){
              console.log(responses);
              res.send(responses);
            }
          });
        }
      } else {
        res.send([{title: "No items found."}]);
      }
    });
  });
};

exports.addGitHubUser = function(ghUser, access_token, promise){
  var options = {
    headers: {
      'User-Agent': 'Read-Up',
      'Authorization': 'token ' + access_token
    },
    host: 'api.github.com',
    path: '/user/emails'
  };
  https.get(options, function(res) {
    res.on('data', function (chunk) {
      var ghID = ghUser.id;
      var ghEmail = chunk.toString();
      // TODO: ALWAYS TRY CATCH WHEN JSON.PARSE CAUSE IT CAN THROW!
      ghEmail = JSON.parse(ghEmail);
      ghEmail = ghEmail[0];
      var userData = {
        email: ghEmail,
        username: ghUser.login,
        image_url: ghUser.avatar_url,
        profile_url: ghUser.html_url,
        public_repos: ghUser.public_repos,
        gh_followers: ghUser.followers
      };
      User.find({where: {github_id: ghID}}).success(function(user){
        if(user){
          user.updateAttributes(userData).success(function(user){
            console.log('user updated in DB');
            return promise.fulfill(user);
          });
        } else {
          userData.github_id = ghID;
          userData.karma = 0;
          User.create(userData).success(function(user){
            console.log('user created in DB');
            return promise.fulfill(user);
          });
        }
      });
    });
  });
  return promise;
};

exports.findUser = function(userId, callback){
  // TODO: handle failure!
  User.find({where: {id: userId}}).success(function(user){
    return callback(null, user);
  });
};

exports.getLoggedInUser = function(req, res){
  res.json(req.user || {});
};
