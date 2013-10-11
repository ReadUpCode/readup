var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Vote = db.Vote;

exports.create = function(req, res){
  Vote.create({ UserId: req.user.dataValues.id, ItemId: req.body.id, value: req.body.value }).success(function(vote){
    res.send(200);
  });
};