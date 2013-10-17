var environConfig = require('./environConfig');
var everyauth = require('everyauth');
var https = require('https');
var users = require('../app/controllers/users.js');

var addGitHubUser = users.addGitHubUser;
var findUser = users.findUser;

everyauth.debug = true;

//everyauth.everymodule.userPkey('github_id');

everyauth.everymodule
    .findUserById(function (id, callback) {
      findUser(id, callback);
    });

everyauth.everymodule.logoutPath('/_/logout');

everyauth.github
  .scope('user:email')
  .appId(environConfig.APP_ID)
  .appSecret(environConfig.APP_SECRET)
  // TODO: handle user denying access to their account info
  .handleAuthCallbackError(function(req, res){
    console.log('******error req:', req);
    console.log('******error res:', res);
    res.redirect('/');
  })
  .findOrCreateUser(function(session, accessToken, accessTokenExtra, ghUser) {
    var userPromise = this.Promise();
    return addGitHubUser(ghUser, accessToken, userPromise);
  })
  .entryPath('/auth/github')
  .redirectPath('/');
