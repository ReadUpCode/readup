var Sequelize  = require('sequelize');
var express = require('express');
var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
var db = require('../../config/db');

///INCLUDING ALL, MIGHT NOT NEED EVERYTHING, CLEAN ACCORDINGLY
var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;
var ItemsTags = sequelize.define('ItemsTags', {});

exports.create = function(req, res){
  Vote.create({ UserId: req.body.user_id, ItemId: req.body.item_id, value: req.body.value }).success(function(vote){
    res.send(vote);
  });
};