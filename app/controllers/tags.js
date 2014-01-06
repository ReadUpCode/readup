var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var User = db.User;
var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;
var Category = db.Category;
var Favorites = db.Favorites;
var VoteTotals = db.VoteTotals;

exports.get = function(req, res){
  db.sequelize
    .query('SELECT Tags.id, Tags.name, COUNT(*) as popularity FROM Tags INNER JOIN ItemsTags ON Tags.id = ItemsTags.TagId GROUP BY Tags.id, Tags.name')
    .success(function(tags){
      res.send(tags);
    });
};

exports.getAllItemsForTag = function(req, res){

  // Used to create VoteTotals rows
  // var voteObj = {};
  // Vote.all().success(function(votes) {
  //   votes.forEach(function(vote, index, list) {
  //     var v = vote.selectedValues;
  //     voteObj[v.ItemId] = voteObj[v.ItemId] || {};
  //     Item.find({include: [Tag], where: {id: v.ItemId}}).success(function(item) {
  //       item.tags.forEach(function(tag, tagI, tagL) {
  //         voteObj[v.ItemId][tag.selectedValues.id] = voteObj[v.ItemId][tag.selectedValues.id] || 0;
  //         if (v.TagId === tag.selectedValues.id || v.TagId === 0) {
  //           voteObj[v.ItemId][tag.selectedValues.id] += v.value;
  //         }
  //       });
  //     });
  //   });
  //   setTimeout(function() {
  //     for (var item in voteObj) {
  //       for (var tag in voteObj[item]) {
  //         VoteTotals.create({ItemId: item, TagId: tag, Total: voteObj[item][tag]});
  //       }
  //     }
  //   }, 15000);
  // });

  // db.sequelize.query("DROP TABLE IF EXISTS `readup-test`.SumVotes").success(function() {
  //   db.sequelize.query("CREATE TEMPORARY TABLE `readup-test`.`SumVotes` (VotesSum int,ItemId int(11),TagId int(11))").success(function() {
  //     db.sequelize.query("INSERT INTO SumVotes (`VotesSum`, `ItemId`, `TagId`) SELECT SUM(`value`), `ItemId`, `TagId` FROM `Votes` GROUP BY `ItemId`, `TagId`").success(function() {
  //       db.sequelize.query("SELECT `Items`.*,\
  //                         `Tags`.*,\
  //                         `SumVotes`.`VotesSum` AS `SumVotes.VotesSum`,\
  //                         `Categories`.`name` AS `Categories.name`,\
  //                         `Users`.`username` AS `Users.username`,\
  //                         `Users`.`id` AS `Users.id`\
  //                         FROM `Items`\
  //                         LEFT OUTER JOIN `ItemsTags` ON `Items`.`id` = `ItemsTags`.`ItemId`\
  //                         LEFT OUTER JOIN `Tags` AS `Tags` ON `Tags`.`id` = `ItemsTags`.`TagId`\
  //                         LEFT OUTER JOIN `Tags` AS `OneTag` ON `Tags`.`id` = `ItemsTags`.`TagId`\
  //                         LEFT OUTER JOIN `SumVotes` ON `Items`.`id` = `SumVotes`.`ItemId`\
  //                         LEFT OUTER JOIN `CategoriesItems` ON `Items`.`id` = `CategoriesItems`.`ItemId`\
  //                         LEFT OUTER JOIN `Categories` AS `Categories` ON `Categories`.`id` = `CategoriesItems`.`CategoryId`\
  //                         LEFT OUTER JOIN `Votes` AS `Votes` ON `Items`.`id` = `Votes`.`ItemId`\
  //                         LEFT OUTER JOIN `Users` AS `Users` ON `Users`.`id` = `Items`.`UserId`\
  //                         ORDER BY `SumVotes`.`VotesSum` DESC\
  //                         LIMIT 0, 10\
  //                         WHERE `OneTag`.`name`='" + req.params.tagName)
  //       .success(function(whatever) {
  //         console.log(whatever);
  //       }).error(function(err) {
  //         console.log('ERRRRRRRRRRRRR', err);
  //       });
  //     }).error(function(err) {
  //       console.log('ERRRRRRRRRRRRR', err);
  //     });
  //   }).error(function(err) {
  //     console.log('ERRRRRRRRRRRRR', err);
  //   });
  // }).error(function(err) {
  //   console.log('ERRRRRRRRRRRRR', err);
  // });

  // SQL Table adjustments needed for query restructure
  // Item.findAll().success(function(items) {
  //   items.forEach(function(item, index, list) {
  //     Item.find({include: [Tag], where:{id: item.selectedValues.id}}).success(function(singleItem) {
  //       var tags = singleItem.tags;
  //       for (var i = 0; i < tags.length; i++) {
  //         if(i === 0) {
  //           singleItem.updateAttributes({TagId: tags[i].selectedValues.id});
  //         } else {
  //           Item.create({title: singleItem.title, link: singleItem.link, createdAt: singleItem.createdAt, updatedAt: singleItem.updatedAt, UserId: singleItem.UserId, TagId: tags[i].selectedValues.id});
  //         }
  //       }
  //     });
  //   });
  // });

  var itemsPerPage = 20;
  req.params.page = req.params.page || 1;
  Tag.find({include: [Item], where: {name: req.params.tagName} }).success(function(tag){
    var responses = [];
    if (tag) {
      VoteTotals.findAll({where: {TagId: tag.selectedValues.id}, offset: itemsPerPage * (req.params.page - 1), order: 'Total DESC', limit: itemsPerPage}).success(function(votes) {
        votes.forEach(function(voteTotal, vIndex, vList) {
          Item.find({include: [Tag, Category, User], where:{id: voteTotal.selectedValues.ItemId}}).success(function(singleItem){
            var requestingUserId = 0;
            if(req.user){
              requestingUserId = req.user.dataValues.id;
            }
            Vote.find({where: {UserId: requestingUserId, ItemId: singleItem.selectedValues.id}}).success(function(userVote) {
              var username = singleItem.user.dataValues.username;
              var userid = singleItem.user.dataValues.id;

              var curUserVote = 0;
              if (userVote) {
                curUserVote = userVote.selectedValues.value;
              }

              // Concentrate data into one object
              var resItem = {};
              resItem = singleItem.selectedValues;
              resItem.curUserVote = curUserVote;
              resItem.score = voteTotal.selectedValues.Total;
              resItem.username = username;
              resItem.userid = userid;

              // Populating tags
              resItem.tags = [];
              resItem.tagFromId = tag.id; // ID of the tag currently being viewed
              for (var k=0; k < singleItem.tags.length; k++) {
                resItem.tags.push(singleItem.tags[k].selectedValues);
              }

              //Populating categories
              resItem.categories = [];
              var categories = singleItem.categories;
              for (var i = 0; i < categories.length; i++) {
                resItem.categories.push(categories[i].selectedValues);
              }

              responses.push(resItem);
              if(responses.length === votes.length){
                res.send(responses);
              }
            }).error(function(error) {
              console.log("Vote Error", error);
            });
          }).error(function(error) {
            console.log("Item Error", error);
          });
        });
      }).error(function(error) {
        console.log("VoteTotals Error", error);
      });
    }
    else {
      res.send([{title: "No items found."}]);
    }
  }).error(function(error) {
    console.log("Tag Error", error);
  });
};
