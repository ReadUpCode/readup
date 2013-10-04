var Sequelize  = require('sequelize');
var express = require('express');
var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
var db = require('../../config/db');


var Item = db.Item;

exports.create = function(req, res){
  Item.create({ title: req.body.title, link: req.body.link }).success(function(item) {
      console.log(item.values);
      res.end();
  });
};