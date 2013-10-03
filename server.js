var express = require('express');
var app = express();
var orm = require('orm');
var modts = require('orm-timestamps'); //plugin for node-orm2 for timestamps

orm.connect('mysql://root@localhost/readup', function(err, db){
  if(err){
    console.log(err);
  } else {
    console.log('GOOD');
  }

  db.use(modts, {
        createdProperty: 'created_at',
        modifiedProperty: 'modified_at',
        dbtype: { type: 'date', time: true },
        now: function() { return new Date(); }
  });


  var User = db.define("user", {
        name: String,
        email: Number,
        karma: Number
  }, {
    timestamp: true
  });
});


app.configure(function(){
  app.use(express.static(__dirname + "/public"));
});

require('./config/routes')(app);

app.listen(3000);
