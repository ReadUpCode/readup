var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;

exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){console.log('ALL TAGS FOR ITEM 1', tags);});
  });
};

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
  var responses = [];
  Item.findAll({include: [Tag]}).success(function(items){
    items.forEach(function(item, index, list){
      Vote.findAll({ where: {ItemId: item.selectedValues.id }})
      .success(function(votes){
        var score=0;
        for(var j=0; j<votes.length; j++){
          score+=votes[j].selectedValues.value;
        }
        var resItem = {};
        resItem = item.selectedValues;
        console.log("INDEX: ", index);
        resItem.tags = [];
        resItem.score = score;
        for (var k=0; k < item.tags.length; k++) {
          resItem.tags.push(item.tags[k].selectedValues);
        }
        responses.push(resItem);
        if(responses.length === items.length){
          res.send(responses);
        }
      });
    });
  });
};

exports.getOne = function(req, res){
  Vote.findAll({where: {ItemId:req.params.id}}).success(function(votes) {
    var score = 0;

    for (var j = 0; j < votes.length; j++) {
      score += votes[j].selectedValues.value;
    }
    Item.find({include: [Tag], where: {id: req.params.id}}).success(function(item){
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
};

exports.getScore = function(req, res){
  var score = 0;
  Vote.findAll({where: {ItemId: req.params.id}}).success(function(votes){
    for(var i = 0; i < votes.length; i++){
      score += votes[i].value;
    }
    res.send({score: score});
  });
};