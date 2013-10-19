var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;
var phantom = require('node-phantom');
var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');
var AWS = require('aws-sdk');
var fs = require('fs')
var s3 = new AWS.S3({region: 'us-west-2'});
var async = require('async')
// AWS.config.loadFromPath(__dirname + '/../../config/config.json');

var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;
var Category = db.Category;


var callback = function(err){console.log(err)}
var q = async.queue(function (task, callback) {
  phantom.create(function(err,ph) {
    return ph.createPage(function(err,page) {
      return page.open(task.link, function(err,status) {
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
        //jQuery Loaded.
        //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
          setTimeout(function() {
            return page.evaluate(function() {
              var height = $(document).height()
              var width = $(document).width()
              return {
                height: height,
                width: width
              };
            }, function(err,result) {
              
              page.set('clipRect', {height: result.height > 2000 ? 2000 : result.height, width: result.width});

              console.log("TASK.ITEM_ID", task.item_id)

              page.render('public/item_images/' + task.item_id + '.png', function(){
                console.log('rendering');
                fs.readFile(__dirname + '/../../public/item_images/'+ task.item_id + '.png', function (err, data) {
                  if (err) { throw err; }
                  var image = new Buffer(data, 'binary')

                  var params = {Bucket: 'readupimages', Key: task.item_id.toString(), ACL: "public-read", ContentType: 'image/jpeg', Body: data};
                  s3.putObject(params, function(err, data) {
                    if (err) {
                      console.log("AMAZON ERROR", err)
                    } else {
                      console.log("Successfully uploaded data to myBucket/myKey");
                      console.log(data)
                    }
                  });
                });
              });
              ph.exit();
            });
          }, 3000);
        });
      });
    });
  });
  callback();
}, 1);

exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){console.log('ALL TAGS FOR ITEM 1', tags);});
  });
};

var addUpVote = function(userId, itemId) {
  Vote.find({where: ['UserId=? AND ItemId=?', userId, itemId]})
  .success(function(vote){
    if(!vote){
      Vote.create({ UserId: userId, ItemId: itemId, value: 1 });
    }
    else if (vote.selectedValues.value !== 1) {
      vote.updateAttributes({value: 1});
    }
  });
};

var addTags = function(item, tags) {
  for(var i in tags){
    Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
      item.addTag(tag);
    });
  }
};

var addCategories = function(item, categories) {
  for (var j in categories) {
    Category.findOrCreate({name: categories[j] }).success(function(category, created) {
      item.addCategory(category);
    })
  }
};

exports.create = function(req, res){
  
  console.log('request', req.body)
  
  if(req.user){
    Q.fcall(
      function(){
        Item.find({ where:{link: req.body.link}}).success(function(item) {
          if (item) {
            addTags(item, req.body.tags);
            addCategories(item, req.body.categories);
            addUpVote(req.user.dataValues.id, item.dataValues.id);
            res.end('done');  
          } else {
            Item.findOrCreate({title: req.body.title, link: req.body.link, UserId: req.user.dataValues.id })
            .success(function(item) {
              addTags(item, req.body.tags);
              addCategories(item, req.body.categories);
              addUpVote(req.user.dataValues.id, item.dataValues.id);

              item_id = item.dataValues.id;
              link = req.body.link;

              res.end('done');

              q.push({item_id: item_id, link: link}, function(foo,bar){
                console.log(foo, bar)
              });
            });
          }
        });
      }
    ).done(function(){console.log("DONE FINALLY")});
  } else {
    res.send(200);
  }
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