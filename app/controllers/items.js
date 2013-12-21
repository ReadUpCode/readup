var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;
var phantom = require('node-phantom');
var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');
var AWS = require('aws-sdk');
var fs = require('fs');
var environConfig = require('../../config/environConfig');
var s3 = new AWS.S3({region: environConfig.S3_REGION});
var async = require('async');



var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;
var Category = db.Category;
var Favorites = db.Favorites;


exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){});
  });
};

var addUpVote = function(userId, itemId) {
  Vote.find({where: ['UserId=? AND ItemId=?', userId, itemId]})
  .success(function(vote){
    if(!vote){
      Vote.create({ UserId: userId, ItemId: itemId, value: 1 });
    }
    else if (vote.selectedValues.value !== 1) {
      vote.updateAttributes({value: 1});
    }
  });
};

var addTags = function(item, tags) {
  for(var i in tags){
    Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
      item.addTag(tag);
    });
  }
};

var addCategories = function(item, categories) {
  for (var j in categories) {
    Category.findOrCreate({name: categories[j] }).success(function(category, created) {
      item.addCategory(category);
    });
  }
};


//Create a new link
exports.create = function(req, res){
  res.end('done');

  if(req.user){
    Q.fcall(
      function(){
        Item.find({ where:{link: req.body.link}}).success(function(item) {
          if (item) {
            addTags(item, req.body.tags);
            addCategories(item, req.body.categories);
            addUpVote(req.user.dataValues.id, item.dataValues.id);
          } else {
            Item.findOrCreate({title: req.body.title, link: req.body.link, UserId: req.user.dataValues.id })
            .success(function(item) {
              addTags(item, req.body.tags);
              addCategories(item, req.body.categories);
              addUpVote(req.user.dataValues.id, item.dataValues.id);

              item_id = item.dataValues.id;
              link = req.body.link;

            });
          }
        });
      }
    )
  } else {
    res.send(200);
  }
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

exports.saveToFavorites = function(req,res){
  Favorites.create({UserId: req.body.userid, ItemId: req.body.linkid})
      .success(function(favorite){
        res.write(201);
      })
      .error(function(err){
        res.send(400);
      })
};

exports.getAllFavoritesForUser = function(req,res){
};
