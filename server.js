var express = require('express');
var path = require('path');
var app = express();

app.configure(function(){
  app.use(express.static(__dirname + "/public"));
});

require('./config/routes')(app);

app.listen(3000);
