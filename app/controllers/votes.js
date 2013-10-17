var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Vote = db.Vote;
var Item = db.Item;
var User = db.User;

exports.create = function(req, res){
	Vote.find({where: ['ItemId=? AND UserId=?', req.body.id, req.user.dataValues.id]})
	.success(function(vote){
		if(!vote){
			Vote.create({ UserId: req.user.dataValues.id, ItemId: req.body.id, value: req.body.value }).success(function(vote){
        res.send(200);
      });
		} else {
			// if the vote is the same, don't do anything
			if(vote.selectedValues.value === req.body.value){
				res.send(200);
			// otherwise, update the vote row with the new value
			} else {
				var voteValue = vote.selectedValues.value + req.body.value;
				vote.updateAttributes({value: voteValue}).success(function(){
					res.send(200);
				});
			}
		}
	});
};

exports.updateKarmaPoster = function(req, res){
	Item.find({where: {id: req.body.id}}).success(function(item){
		User.find({where: {id: item.selectedValues.UserId}}).success(function(user){
			var newKarma = user.selectedValues.karma + 9;
			user.updateAttributes({karma: newKarma});
		});
	});
};

exports.updateKarmaVoter = function(req, res){
	Vote.findAll({where: ['ItemId=? AND value=?', req.body.id, 1]}).success(function(data){
		for(var i = 0; i < data.length; i++){
			User.find({where: {id: data[i].selectedValues.UserId}}).success(function(user){
				var newKarma = user.selectedValues.karma + 1;
				user.updateAttributes({karma: newKarma});
			});
		}
	});
};