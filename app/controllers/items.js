var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;

exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){console.log('ALL TAGS FOR ITEM 1', tags);});
  });
};

exports.create = function(req, res){
  var phantom=require('node-phantom');

  Item.create({ 
    title: req.body.title, link: req.body.link }).success(function(item) {
    var tags = Object.keys(req.body.tags);
    console.log("ITEM:", item)
    for(var i = 0; i < tags.length; i++){
      Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
        item.addTag(tag).success(function(tag){
          // console.log('SET TAG', tag);
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
      return page.open(link, function(err,status) {
        console.log("opened site? ", status);
        // page.open('http://google.com', function () {
            // page.zoomFactor = 0.25;
            // page.set('viewportSize', {width: 100, height: 100})
            // page.set('zoomFactor', .25)
            // page.set('clipRect', {width: 500, height: 500})
            // page.viewportSize = { width: 600, height: 6000 }; 
            // page.clipRect = { top: 14, left: 3, width: 400, height: 600 }; 
            page.render('item_images/' + item_id + '.png', function(){console.log('rendering')});
        // });
        // page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
        //   //jQuery Loaded.
        //   //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
        //   setTimeout(function() {
        //     return page.evaluate(function() {
        //       //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
        //       // var h2Arr = [],
        //       // pArr = [];
        //       // $('h2').each(function() {
        //       //   h2Arr.push($(this).html());
        //       // });
        //       // $('p').each(function() {
        //       //   pArr.push($(this).html());
        //       // });
        //       var imgArr = [];
        //       $('img').each(function(){
        //         imgArr.push($(this).attr())
        //       })

        //       return {
        //         // h2: h2Arr,
        //         // p: pArr
        //         img: imgArr
        //       };
        //     }, function(err,result) {
        //       console.log(result);
        //       ph.exit();
        //     });
        //   }, 1000);
        // });
          page.close(function(){
            console.log('closing connection to linked website...')
          })
        });
        res.end();   
      });
    });
  })

  // Item.create({ title: req.body.title, link: req.body.link }).success(function(item) {
  //   var tags = Object.keys(req.body.tags);
  //   for(var i = 0; i < tags.length; i++){
  //     Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
  //       item.addTag(tag).success(function(tag){
  //         // console.log('SET TAG', tag);
  //       });
  //     });
  //   }
  // });
  res.end();
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