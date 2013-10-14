var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;
var Category = db.Category;

exports.get = function(req, res){
  Tag.findAll().success(function(tags){
    res.send(tags);
  });
};

exports.getAllItemsForTag = function(req, res){
  Tag.find({include: [Item], where: {name: req.params.tagName} }).success(function(tag){
    var responses = [];

    if (tag) {
      tag.items.forEach(function(item, index, list){
        Item.find({include: [Tag], where:{id: item.selectedValues.id}}).success(function(singleItem){
          if(!req.user){
            var requestingUserId = 0; 
          } else {
            var requestingUserId = req.user.dataValues.id;
          }
          Vote.find({where: ['ItemId=? AND UserId=?', item.selectedValues.id, requestingUserId]})
          .success(function(userVote){
            if (userVote){
              var curUserVote = userVote.selectedValues.value;
            } else {
              var curUserVote = 0;
            }
            Vote.findAll({ where: {ItemId: item.selectedValues.id }})
            .success(function(votes){
              var score=0;
              for(var j=0; j<votes.length; j++){
                score+=votes[j].selectedValues.value;
              }
              var resItem = {};
              resItem = singleItem.selectedValues;
              resItem.curUserVote = curUserVote;
              resItem.tags = [];
              resItem.score = score;
              for (var k=0; k < singleItem.tags.length; k++) {
                resItem.tags.push(singleItem.tags[k].selectedValues);
              }
              Item.find({include: [Category], where: {id: item.selectedValues.id}})
              .success(function(itemCats) {
                resItem.categories = [];
                console.log('itemCats!!!!!!!!!', itemCats);
                var categories = itemCats.categories;
                for (var i = 0; i < categories.length; i++) {
                  resItem.categories.push(categories[i].selectedValues);
                }
                responses.push(resItem);
                if(responses.length === tag.items.length){
                  console.log('final response! ', responses)
                  res.send(responses);
                }
              });
            });
          });
        });
      });
    }
    else {
      res.send([{title: "No items found."}]);
    }
  });
};
