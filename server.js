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
    store: new MySQLSessionStore(
      process.env.MYSQL_DATABASE,
      process.env.MYSQL_USERNAME,
      process.env.MYSQL_PASSWORD,
      {
        host: process.env.MYSQL_HOST
      }
    )
  }));
  app.use(everyauth.middleware());
});

require('./config/routes')(app);

app.listen(process.env.PORT);
