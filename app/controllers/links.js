var phantom        = require('node-phantom');
var request        = require('request');
var cheerio        = require('cheerio');
var fs             = require('fs');
var cleanTopTagArr = require('../../config/topTags.js').cleanTopTagArr;
var environConfig = require('../../config/environConfig');

var ALCHEMY_KEY    = environConfig.ALCHEMY_KEY;
var topTagArr, topTags;

fs.readFile(__dirname + '/../../public/js/factories/curatedSuggestedTags.json', 'utf8', function(err, data) {
  if (err) {throw err;}
  topTagArr = JSON.parse(data);
  topTags = cleanTopTagArr(topTagArr);
});

var cleanAllKeywords = function(keywordsArr) {
  var cleanKeywordsArray = [];
  for (var i = 0; i < keywordsArr.length; i++) {
    var fullText = keywordsArr[i].text;
    fullText = fullText.toLowerCase();
    cleanKeywordsArray.push(fullText);
    var splitKeywords = fullText.split(/\.| /);
    cleanKeywordsArray = cleanKeywordsArray.concat(splitKeywords);
  }
  return cleanKeywordsArray;
};

var cleanTitle = function(title) {
  title = title.toLowerCase();
  var splitTitle = title.split(/ |\/|\./);
  return splitTitle;
};

var getTitleText = function(body, res, suggestedData) {
  var $ = cheerio.load(body);
  var titleText = $('title').text();
  var titleArray = cleanTitle(titleText);

  for (var j = 0; j < titleArray.length; j++) {
    var singleWord = titleArray[j];
    var twoWords = titleArray[j] + '-' + titleArray[j+1];
    var threeWords = titleArray[j] + '-' + titleArray[j+1] + '-' + titleArray[j+2];
    if (singleWord in topTags) {
      suggestedData.tags[topTags[singleWord]] = topTags[singleWord];
    }
    if (twoWords in topTags) {
      suggestedData.tags[topTags[twoWords]] = topTags[twoWords];
    }
    if (threeWords in topTags) {
      suggestedData.tags[topTags[threeWords]] = topTags[threeWords];
    }
  }
  suggestedData.title = titleText;
  res.json(suggestedData);
};


//Gets keywords for given URL from Alchemy, and then cleans it and compares against our database of terms.
exports.getText = function(req, res) {
  var apiUrl = 'http://access.alchemyapi.com/calls/url/URLGetRankedKeywords?apikey='+ALCHEMY_KEY+'&maxRetrieve=15&url='+req.body.url+'&outputMode=json';
  request.post({url:apiUrl}, function(error, response, body) {
    if (!error && response.statusCode === 200){
      var result;
      try {
        result = JSON.parse(body);
      }catch(e) {
        throw e;
      }
      var keywordsArr = result.keywords;
      var cleanKeywords = cleanAllKeywords(keywordsArr);
      var suggestedData = {tags: {}, title:''};

      for (var i = 0; i < cleanKeywords.length; i++) {
        var singleWord = cleanKeywords[i];
        var twoWords = cleanKeywords[i] + '-' + cleanKeywords[i+1];
        var threeWords = cleanKeywords[i] + '-' + cleanKeywords[i+1] + '-' + cleanKeywords[i+2];
        if (singleWord in topTags) {
          suggestedData.tags[topTags[singleWord]] = topTags[singleWord];
        }
        if (twoWords in topTags) {
          suggestedData.tags[topTags[twoWords]] = topTags[twoWords];
        }
        if (threeWords in topTags) {
          suggestedData.tags[topTags[threeWords]] = topTags[threeWords];
        }
      }
      request.get(req.body.url, function(error, response, body) {
        if(error) {throw error;}
        if(!error && response.statusCode === 200) {
          getTitleText(body, res, suggestedData);
        }
      });
    }
  });
};







