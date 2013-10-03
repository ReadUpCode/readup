var Sequelize  = require('sequelize');
var express = require('express');

var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});
exports.create = function(req){
  Item.create({ title: req.body.title, link: req.body.link }).success(function(item) {
      console.log(item.values);
  });
  // User.create({ username: 'barfooz', isAdmin: true }, [ 'username' ]).success(function(user) {
  // console.log(user.values) // => { username: 'barfooz', isAdmin: false }
// })

};