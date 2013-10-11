var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Vote = db.Vote;

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
