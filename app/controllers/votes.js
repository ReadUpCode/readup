var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Vote = db.Vote;
var VoteTotals = db.VoteTotals;
var Item = db.Item;
var User = db.User;

exports.create = function(req, res){
  Vote.find({where: ['ItemId=? AND TagId=? AND UserId=?', req.body.id, req.body.tagFromId, req.user.dataValues.id]})
  .success(function(vote){
    if(!vote){
      Vote.create({ UserId: req.user.dataValues.id, ItemId: req.body.id, TagId: req.body.tagFromId, value: req.body.value }).success(function(vote){
        // Update total
        VoteTotals.find({where: {ItemId: req.body.id, TagId: req.body.tagFromId}}).success(function(total) {
          total.updateAttribute({Total: total.selectedValues.Total + req.body.value}).success(function() {
            res.send(200);
          });
        });
      });
    } else {
      // if the vote is the same, don't do anything
      if(vote.selectedValues.value === req.body.value){
        res.send(200);
      // otherwise, update the vote row with the new value
      } else {
        var voteValue = vote.selectedValues.value + req.body.value;
        vote.updateAttributes({value: voteValue}).success(function(){
          // Update total
          VoteTotals.find({where: {ItemId: req.body.id, TagId: req.body.tagFromId}}).success(function(total) {
            total.updateAttribute({Total: total.selectedValues.Total + req.body.value}).success(function() {
              res.send(200);
            });
          });
        });
      }
    }
  });
};

exports.updateKarma = function(req, res){
  if (req.body.value === 1){
    Item.find({include: [User], where: {id: req.body.id}}).success(function(item){
      var newKarma = item.user.selectedValues.karma + 9;
      item.user.updateAttributes({karma: newKarma}).success(function(user){
        Vote.findAll({include: [User], where: ['ItemId=? AND (TagId=? OR TagId=?) AND value=?', req.body.id, req.body.tagFromId, 0, 1]}).success(function(data){
          if (!Array.isArray(data)) { data = [data]; }
          for(var i = 0; i < data.length; i++){
            var newKarma = data[i].user.selectedValues.karma + 1;
            data[i].user.updateAttributes({karma: newKarma});
          }
        });
      });
    });
  }
};
