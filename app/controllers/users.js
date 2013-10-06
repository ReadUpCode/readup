var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var User = db.User;
var Item = db.Item;

var users = {};
var userIdCount = 1;
exports.getAllItemsForUser = function(req, res){
  User.findAll({include: [Item], where: {id: req.params.id } }).success(function(items){
    res.send(items);
  });
};

exports.addGitHubUser = function(ghUserId){
  users[userIdCount] = ghUserId;
  userIdCount++;
  console.log('users in our DB! ',users);
  return ghUserId;
};
