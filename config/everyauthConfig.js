var everyauth = require('everyauth');
var addGitHubUser = require('../app/controllers/users.js').addGitHubUser;

everyauth.debug = true;

everyauth.github
  .appId(process.env.APP_ID)
  .appSecret(process.env.APP_SECRET)
  .findOrCreateUser(function(session, accessToken, accessTokenExtra, ghUser) {
    // TODO: write find user function
    return false || addGitHubUser(ghUser.id);
  })
  .entryPath('/auth/github')
  .redirectPath('/');
