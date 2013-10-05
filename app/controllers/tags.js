var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Item = db.Item;
var Tag = db.Tag;

exports.get = function(req, res){
  Tag.findAll().success(function(tags){
    res.send(tags);
  });
};

exports.getAllItemsForTag = function(req, res){
  Tag.find({include: [Item], where: {name: req.params.tagName} }).success(function(items){
    console.log(JSON.stringify(items));
    res.send(items);
  });
};
