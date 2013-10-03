var express = require('express');
var app = express();
app.use(express.bodyParser());
var Sequelize  = require('sequelize');

var sequelize = new Sequelize('mysql://root@127.0.0.1/readup', {});

var User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull:false // what does this even mean?
  },
  email: Sequelize.STRING,
  karma: Sequelize.INTEGER.UNSIGNED
});

var Item = sequelize.define('Item', {
  title: Sequelize.STRING,
  link: Sequelize.STRING
});

var Tag = sequelize.define('Tag', {
  name: Sequelize.STRING
});

var Vote = sequelize.define('Vote', {
  value: Sequelize.INTEGER.UNSIGNED
});

User.hasMany(Item, { foreignKey: 'user_id' });
User.hasMany(Vote, { foreignKey: 'user_id' });
Item.hasMany(Vote, { foreignKey: 'item_id' });
Item.hasMany(Tag, { foreignKey: 'item_id' });
Tag.hasMany(Item, { foreignKey: 'tag_id'});

User.sync();
Item.sync();
Tag.sync();
Vote.sync();

app.configure(function(){
  app.use(express.static(__dirname + "/public"));
});

require('./config/routes')(app);

app.listen(3000);
