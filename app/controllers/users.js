var Sequelize  = require('sequelize');
var express = require('express');
var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
var db = require('../../config/db');

///INCLUDING ALL, MIGHT NOT NEED EVERYTHING, CLEAN ACCORDINGLY
var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var ItemsTags = sequelize.define('ItemsTags', {});

exports.getAllItemsForUser = function(req, res){
  User.findAll({include: [Item], where: {id: req.params.id } }).success(function(items){
    res.send(items);
  });
};
