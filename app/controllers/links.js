var phantom = require('node-phantom');
var request = require('request');
var cheerio = require('cheerio');
var ALCHEMY_KEY = process.env.ALCHEMY_KEY;

exports.getText = function(req, res) {
  var apiUrl = 'http://access.alchemyapi.com/calls/url/URLGetRankedKeywords?apikey='+ALCHEMY_KEY+'&url='+req.body.url+'&outputMode=json';
  console.log(ALCHEMY_KEY);
  console.log(apiUrl);
  request.post({url:apiUrl}, function(error, response, body) {
    if (!error && response.statusCode === 200){
      var result = JSON.parse(body);
      console.log(result);
      var keywordsObj = result.keywords;
      var keywords = [];
      for (var i = 0; i < keywordsObj.length; i++) {
        keywords.push(keywordsObj[i].text);
      }
      res.json(keywords);
    }
  });
};

 // var $ = cheerio.load(body);
 //    var allText = '';
 //    var tags = ['title','h1', 'h2', 'h3', 'p', 'li', 'a'];
 //    var getTagText = function() {
 //      var tagText = $(this).text();
 //      allText += tagText;
 //    };

 //    for (var i = 0; i < tags.length; i++) {
 //      $(tags[i]).each(getTagText);
 //    }
    
 //    res.json(allText);