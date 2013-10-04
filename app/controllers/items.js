var Sequelize  = require('sequelize');
var express = require('express');
var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
var db = require('../../config/db');

var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var ItemsTags = sequelize.define('ItemsTags', {});

exports.getAllItemsForUser = function(req, res){
  Item.findAll({ include: [User], where: {UserId: req.UserId}}).success(function(items){
    // console.log(JSON.stringify(items));
  });
};

exports.getAllItemsForTag = function(req, res){
  Item.findAll({include: [ItemsTags], where: {id: 1} }).success(function(items){
    console.log(JSON.stringify(items));
  });
};

exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){console.log('ALL TAGS FOR ITEM 1', tags);});
  });
};

///FIX MY ASYNC ISSUES
exports.create = function(req, res){
  Item.create({ title: req.body.title, link: req.body.link }).success(function(item) {
    var tags = Object.keys(req.body.tags);
    for(var i = 0; i < tags.length; i++){
      Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
        item.addTag(tag).success(function(tag){console.log('SET TAG', tag);});
      });
    }
  });
  res.end();
};

exports.get = function(req,res) {
  Item.findAll().success(function(items){
    res.send(items);
  });
};

exports.getOne = function(req, res){
  Item.find({where: {id: req.params.id}}).success(function(item){
    res.send(item);
  });
};



