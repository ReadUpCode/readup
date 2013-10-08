var everyauth = require('everyauth');
var addGitHubUser = require('../app/controllers/users.js').addGitHubUser;
var https = require('https');

everyauth.debug = true;

everyauth.github
  .scope('user:email')
  .appId(process.env.APP_ID)
  .appSecret(process.env.APP_SECRET)
  .findOrCreateUser(function(session, accessToken, accessTokenExtra, ghUser) {
    // TODO: write find user function
    getGHemail(accessToken);
    return false || addGitHubUser(ghUser.id);
  })
  .entryPath('/auth/github')
  .redirectPath('/');


 var getGHemail = function(token){
 	var requestURL = 'https://api.github.com/user/emails?access_token=' + token;
	https.get(requestURL, function(res) {
		res.on('data', function (chunk) {
    });
	})
 };
