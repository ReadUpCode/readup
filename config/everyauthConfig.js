var everyauth = require('everyauth');
var addGitHubUser = require('../app/controllers/users.js').addGitHubUser;
var https = require('https');

everyauth.debug = true;

// everyauth.everymodule.findUserById(function(userId, cb) {
//     console.log('findByUserId called');
//     UserService.findOne({ id: userId }, function(err, user) {
//         return cb(err, user);
//     });
// });

everyauth.github
  .scope('user:email')
  .appId(process.env.APP_ID)
  .appSecret(process.env.APP_SECRET)
  .findOrCreateUser(function(session, accessToken, accessTokenExtra, ghUser) {
    // TODO: write find user function
    console.log('ghUser in findOrCreate everyauth: ', ghUser);
    return false || addGitHubUser(ghUser, accessToken);
  })
  .entryPath('/auth/github')
  .redirectPath('/');
