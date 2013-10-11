var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;
var https = require('https');

var User = db.User;
var Item = db.Item;

exports.getAllItemsForUser = function(req, res){
  User.findAll({include: [Item], where: {id: req.params.id } }).success(function(items){
    res.send(items);
  });
};

exports.addGitHubUser = function(ghUser, access_token){
  var requestURL = 'https://api.github.com/user/emails?access_token=' + access_token;
  https.get(requestURL, function(res) {
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
          user.updateAttributes(userData).success(function(){
            console.log('user updated in DB');
          });
        } else {
          userData.github_id = ghID;
          User.create(userData).success(function(){
            console.log('user created in DB');
          });
        }
      });
    });
  });
  return ghUser;
};

exports.findUser = function(userId, callback){
  // TODO: handle failure!
  User.find({where: {github_id: userId}}).success(function(user){
    return callback(null, user);
  });
};

exports.getLoggedInUser = function(req, res){
  res.send(200, req.user);
};
