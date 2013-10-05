var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;

exports.get = function(req, res){
  Tag.findAll().success(function(tags){
    res.send(tags);
  });
};

exports.getAllItemsForTag = function(req, res){
  // Tag.find({include: [Item], where: {name: req.params.tagName} }).success(function(items){
  //   console.log(JSON.stringify(items));
  //   res.send(items);
  // });
  Tag.find({include: [Item], where: {name: req.params.tagName} }).success(function(tag){
    Vote.findAll({where: {ItemId:tag.items[0].id}}).success(function(votes) {
    var score = 0;
    if(votes){
      for (var j = 0; j < votes.length; j++) {
        score += votes[j].selectedValues.value;
      }
    }
    Item.find({include: [Tag], where: {id: tag.items[0].id}}).success(function(item){
      var resItem = {};

      resItem = item.selectedValues;
      resItem.tags = [];
      for (var i =0; i < item.tags.length; i++) {
        resItem.tags.push(item.tags[i].selectedValues);
      }
      resItem.score = score;
      res.send(resItem);
    });
  });
  });
};
