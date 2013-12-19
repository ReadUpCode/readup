var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;
var Category = db.Category;
var Favorites = db.Favorites;

exports.get = function(req, res){
  db.sequelize
    .query('SELECT Tags.id, Tags.name, COUNT(*) as popularity FROM Tags INNER JOIN ItemsTags ON Tags.id = ItemsTags.TagId GROUP BY Tags.id, Tags.name')
    .success(function(tags){
      res.send(tags);
    });
};

exports.getAllItemsForTag = function(req, res){
  Tag.find({include: [Item], where: {name: req.params.tagName} }).success(function(tag){
    var responses = [];
    if (tag) {
      tag.items.forEach(function(item, index, list){
        Item.find({include: [Tag, Category, Vote, User], where:{id: item.selectedValues.id}}).success(function(singleItem){
          var requestingUserId = 0;
          if(req.user){
            requestingUserId = req.user.dataValues.id;
          }

          var username = singleItem.user.dataValues.username;
          var userid = singleItem.user.dataValues.id;

          // Count votes to get item score
          var votes = singleItem.votes;
          var score=0;
          var curUserVote = 0;
          for(var j=0; j<votes.length; j++){
            if (votes[j].TagId === tag.id || votes[j].TagId === 0) {
              score+=votes[j].selectedValues.value;

              // Checking if currentUser has voted on item
              if (votes[j].selectedValues.UserId === requestingUserId) {
                curUserVote = votes[j].selectedValues.value;
              }
            }
          }

          // Concentrate data into one object
          var resItem = {};
          resItem = singleItem.selectedValues;
          resItem.curUserVote = curUserVote;
          resItem.score = score;
          resItem.username = username;
          resItem.userid = userid;

          // Populating tags
          resItem.tags = [];
          resItem.tagFromId = tag.id; // ID of the tag currently being viewed
          for (var k=0; k < singleItem.tags.length; k++) {
            resItem.tags.push(singleItem.tags[k].selectedValues);
          }

          //Populating categories
          resItem.categories = [];
          var categories = singleItem.categories;
          for (var i = 0; i < categories.length; i++) {
            resItem.categories.push(categories[i].selectedValues);
          }

          responses.push(resItem);
          if(responses.length === tag.items.length){
            res.send(responses);
            console.log(responses);
          }
        });
      });
    }
    else {
      res.send([{title: "No items found."}]);
    }
  });
};
