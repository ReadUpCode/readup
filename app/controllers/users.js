var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;
var https = require('https');

var User = db.User;
var Item = db.Item;

exports.getAllItemsForUser = function(req, res){
  User.findAll({include: [Item], where: {id: req.params.id } }).success(function(items){
    res.send(items);
  });
};

exports.addGitHubUser = function(ghUser, access_token){
	var requestURL = 'https://api.github.com/user/emails?access_token=' + access_token;
	https.get(requestURL, function(res) {
		res.on('data', function (chunk) {
			var ghID = ghUser.id;
			var ghEmail = chunk.toString();
			ghEmail = JSON.parse(ghEmail);
			ghEmail = ghEmail[0];
			User.findOrCreate({email: ghEmail, 
				name: ghUser.login, 
				karma: 1,
				github_id: ghID})
    		.success(function(){
      		console.log('user recorded in our DB');
    		});
  	});
	});
	return ghUser.id;
};
