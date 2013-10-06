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
    var responses = [];
    console.log(tag.items);
    tag.items.forEach(function(item, index, list){
      Item.find({include: [Tag], where:{id: item.selectedValues.id}}).success(function(singleItem){
        Vote.findAll({ where: {ItemId: item.selectedValues.id }})
        .success(function(votes){
          var score=0;
          for(var j=0; j<votes.length; j++){
            score+=votes[j].selectedValues.value;
          }
          var resItem = {};
          resItem = singleItem.selectedValues;
          resItem.tags = [];
          resItem.score = score;
          for (var k=0; k < singleItem.tags.length; k++) {
            resItem.tags.push(singleItem.tags[k].selectedValues);
          }
          responses.push(resItem);
          if(responses.length === tag.items.length){
            res.send(responses);
          }
        });
      });
    });
  });
};
