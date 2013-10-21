var request = require('superagent');
var expect = require('expect.js');

var items = require('../app/controllers/items');
var users = require('../app/controllers/users');
var tags = require('../app/controllers/tags');
var votes = require('../app/controllers/votes');
var links = require('../app/controllers/links');


before(function(){
  // seed the database
});

describe('Suite one', function(){
 it (function(done){
   request.get('localhost:3000').end(function(res){
  // insert test
    done();
   });
  });
});