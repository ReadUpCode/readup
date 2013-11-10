var express = require('express');
var everyauth = require('everyauth');
var everyauthConfig = require('./config/everyauthConfig.js');
var environConfig = require('./config/environConfig');

var app = express();
var MySQLSessionStore = require('connect-mysql-session')(express);

app.use(express.bodyParser());

app.configure(function(){
  app.use(express.static(__dirname + "/public"));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: environConfig.SESSION_SECRET,
    store: new MySQLSessionStore(
      environConfig.MYSQL_DATABASE,
      environConfig.MYSQL_USERNAME,
      environConfig.MYSQL_PASSWORD,
      {
        host: environConfig.MYSQL_HOST
      }
    )
  }));
  app.use(everyauth.middleware());
});

require('./config/routes')(app);

app.listen(environConfig.PORT, function() {
  if (environConfig.environment === 'development') {
    console.log('***************** Read Up listening on port 3000. Navigate to localhost:3000 in your browser to view it*****************');
  }
});