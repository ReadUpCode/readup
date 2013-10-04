var Sequelize  = require('sequelize');
var express = require('express');
var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
var db = require('../../config/db');


var Item = db.Item;
var Tag = db.Tag;

exports.create = function(req, res){
  Item.create({ title: req.body.title, link: req.body.link }).success(function(item) {
    var tags = req.body.tags;
    for(var key in tags){
      Tag.findOrCreate({ name: tags[key] }).success(function(tag, created) {
          console.log(tag.id);
          console.log(created);
      }).failure(function(err){
        console.log(err);
      });
    }
   res.end();
  });
};