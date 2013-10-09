var everyauth = require('everyauth');
var addGitHubUser = require('../app/controllers/users.js').addGitHubUser;
var findUser = require('../app/controllers/users.js').findUser;
var https = require('https');

everyauth.debug = true;

//everyauth.everymodule.userPkey('github_id');

everyauth.everymodule
    .findUserById(function (id, callback) {
      findUser(id, callback);
    });

everyauth.everymodule.logoutPath('/_/logout');

everyauth.github
  .scope('user:email')
  .appId(process.env.APP_ID)
  .appSecret(process.env.APP_SECRET)
  // TODO: handle user denying access to their account info
  .handleAuthCallbackError(function(req, res){
    console.log('******error req:', req);
    console.log('******error res:', res);
    res.redirect('/');
  })
  .findOrCreateUser(function(session, accessToken, accessTokenExtra, ghUser) {
    console.log('ghUser in findOrCreate everyauth: ', ghUser);
    return false || addGitHubUser(ghUser, accessToken);
  })
  .entryPath('/auth/github')
  .redirectPath('/');
