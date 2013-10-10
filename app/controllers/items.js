var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;
var phantom = require('node-phantom');
var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');


var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;

exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){console.log('ALL TAGS FOR ITEM 1', tags);});
  });
};

exports.create = function(req, res){
  var title;
  Q.fcall(
    function(){
      deferred = Q.defer()
      request(req.body.link, function(error, response, body) {
      // Hand the HTML response off to Cheerio and assign that to
      //  a local $ variable to provide familiar jQuery syntax.
        var $ = cheerio.load(body);
     
      // Exactly the same code that we used in the browser before:
        // var title;
        $('title').each(function() {  
          title = $(this).text();
          deferred.resolve(title.replace(/^[\s+\.]|[\s+\.]$/g, ""))
        });
        return title.replace(/ +?/g, '')
      })
      return deferred.promise
    }
  ).then(
    function(title){
      Item.create({ 
        title: title, link: req.body.link }).success(function(item) {
        var tags = Object.keys(req.body.tags);
        for(var i = 0; i < tags.length; i++){
          Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
            item.addTag(tag).success(function(tag){
            });
          });
        }
        item_id = item.dataValues.id;
        link = req.body.link;
        console.log('req.body', req.body.link)

        phantom.create(function(err,ph) {
        console.log('ph:', ph)
        return ph.createPage(function(err,page) {
          console.log("page:", page.sendEvent)
          page.set('viewportSize', { width: 1024, height: 768 });
          return page.open(link, function(err,status) {
            console.log("opened site? ", status);
            // page.open('http://google.com', function () {
                // page.zoomFactor = 3;
                // page.set('viewportSize', {width: 100, height: 100})
                // page.set('zoomFactor', .25)0


                // page.set('clipRect', {width: 500, height: 500})
                // page.viewportSize = { width: 600, height: 6000 }; 
                // page.clipRect = { top: 14, left: 3, width: 400, height: 600 }; 
                // page.set('clipRect', {top:0, left:0, width:1024, height:1024});
                page.render('public/item_images/' + item_id + '.png', function(){console.log('rendering')});
      
              page.close(function(){
                console.log('closing connection to linked website...')
              })
            });
            res.end();   
          });
        });
      })
      res.end();
    }
  ).done(function(){console.log("DONE FINALLY")})
};

exports.get = function(req,res) {
  var responses = [];
  Item.findAll({include: [Tag]}).success(function(items){
    items.forEach(function(item, index, list){
      Vote.findAll({ where: {ItemId: item.selectedValues.id }})
      .success(function(votes){
        var score=0;
        for(var j=0; j<votes.length; j++){
          score+=votes[j].selectedValues.value;
        }
        var resItem = {};
        resItem = item.selectedValues;
        console.log("INDEX: ", index);
        resItem.tags = [];
        resItem.score = score;
        for (var k=0; k < item.tags.length; k++) {
          resItem.tags.push(item.tags[k].selectedValues);
        }
        responses.push(resItem);
        if(responses.length === items.length){
          res.send(responses);
        }
      });
    });
  });
};

exports.getOne = function(req, res){
  Vote.findAll({where: {ItemId:req.params.id}}).success(function(votes) {
    var score = 0;

    for (var j = 0; j < votes.length; j++) {
      score += votes[j].selectedValues.value;
    }
    Item.find({include: [Tag], where: {id: req.params.id}}).success(function(item){
      var resItem = {};

      resItem = item.selectedValues;
      resItem.tags = [];
      for (var i =0; i < item.tags.length; i++) {
        resItem.tags.push(item.tags[i].selectedValues);
      }
      resItem.score = score;
      res.send(resItem);
    });
  });
};

exports.getScore = function(req, res){
  var score = 0;
  Vote.findAll({where: {ItemId: req.params.id}}).success(function(votes){
    for(var i = 0; i < votes.length; i++){
      score += votes[i].value;
    }
    res.send({score: score});
  });
};