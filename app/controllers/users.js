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
