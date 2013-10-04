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

User.hasMany(Item);
User.hasMany(Vote);
Item.hasMany(Vote);
Item.hasMany(Tag);
Tag.hasMany(Item);

Item.belongsTo(User);

User.sync();
Item.sync();
Tag.sync();
Vote.sync();

module.exports.User = User;
module.exports.Item = Item;
module.exports.Tag = Tag;
module.exports.Vote = Vote;