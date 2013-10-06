var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var User = db.User;
var Item = db.Item;

exports.getAllItemsForUser = function(req, res){
  User.findAll({include: [Item], where: {id: req.params.id } }).success(function(items){
    res.send(items);
  });
};

exports.addGitHubUser = function(ghUserId){
  User.findOrCreate({github_id: ghUserId}, {name: 'blake'})
    .success(function(){
      console.log('users in our DB! ');
    });
  return ghUserId;
};
