var express = require('express');
var everyauth = require('everyauth');
var everyauthConfig = require('./config/everyauthConfig.js');
var app = express();
var MySQLSessionStore = require('connect-mysql-session')(express);

app.use(express.bodyParser());

app.configure(function(){
  app.use(express.static(__dirname + "/public"));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: process.env.SESSION_SECRET,
    store: new MySQLSessionStore('readup', 'root', '', {})
  }));
  app.use(everyauth.middleware());
});

require('./config/routes')(app);

app.listen(3000);
