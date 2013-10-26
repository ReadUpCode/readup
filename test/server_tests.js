var request = require('superagent');
var expect = require('expect.js');

var items = require('../app/controllers/items');
var users = require('../app/controllers/users');
var tags = require('../app/controllers/tags');
var votes = require('../app/controllers/votes');
var links = require('../app/controllers/links');
var db    = require('../config/db.js');

before(function(done){
  // seed the database
  var testUserData = {username: 'testUser',
                      email: 'testUser@test.com',
                      github_id: 8749382,
                      image_url: 'http://www.github.com/testUser/profileImg/87843',
                      profile_url: 'http://www.github.com/testUser/profile/87843',
                      public_repos: 83,
                      karma: 0,
                      gh_followers: 287,
                      id: 2830
                     };
  db.User.findOrCreate(testUserData).success(function(user) {
    done();
  });
});

describe('Users', function(){
  it('should create a user with the passed in properties', function(done) {
    db.User.find({where: {username: 'testUser'}}).success(function(user) {
      expect(user.dataValues.username).to.contain('testUser');
      expect(user.dataValues.email).to.contain('testUser@test.com');
      expect(user.dataValues.github_id).to.be(8749382);
      done();
    });
  });
});

after(function(done) {
  db.User.destroy({username: 'testUser'}).success(function() {
    console.log('destroyed test user');
    done();
  });
});