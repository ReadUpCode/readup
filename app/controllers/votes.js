var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Vote = db.Vote;

exports.create = function(req, res){
  Vote.create({ UserId: req.body.user_id, ItemId: req.body.item_id, value: req.body.value }).success(function(vote){
    res.send(vote);
  });
};