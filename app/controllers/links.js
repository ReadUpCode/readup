var phantom = require('node-phantom');
var request = require('request');
var cheerio = require('cheerio');

exports.getText = function(req, res) {
  console.log(req.body.link);
  request(req.body.url, function(error, response, body) {
    //saving to dollar sign for familar jquery syntax
    var $ = cheerio.load(body);
    var h1s = [];
    $('h1').each(function() {
      var h1 = $(this).text().replace(/^[\s+\.]|[\s+\.]$/g, "");
      h1.replace(/ +?/g, '');
      h1s.push(h1);
    });
    res.json(h1s);
  });
};