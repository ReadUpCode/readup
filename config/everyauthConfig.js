var everyauth = require('everyauth');

var users = {};
var userIdCount = 1;

everyauth.debug = true;

var addNewUser = function(ghUserId){
  users[userIdCount] = ghUserId;
  userIdCount++;
  console.log('users in our DB! ',users);
  return ghUserId;
};

everyauth.github
  .appId(process.env.APP_ID)
  .appSecret(process.env.APP_SECRET)
  .findOrCreateUser(function(session, accessToken, accessTokenExtra, ghUser) {
    return users[ghUser.id] || addNewUser(ghUser.id);
  })
  .entryPath('/auth/github')
  .redirectPath('/');
