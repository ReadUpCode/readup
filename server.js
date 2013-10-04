var express = require('express');
var app = express();
app.use(express.bodyParser());


app.configure(function(){
  app.use(express.static(__dirname + "/public"));
});

require('./config/routes')(app);

app.listen(3000);
