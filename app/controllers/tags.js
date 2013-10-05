var Sequelize  = require('sequelize');
var express = require('express');
var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
var db = require('../../config/db');

///INCLUDING ALL, MIGHT NOT NEED EVERYTHING, CLEAN ACCORDINGLY
var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var ItemsTags = sequelize.define('ItemsTags', {});

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
