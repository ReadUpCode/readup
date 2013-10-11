var Sequelize  = require('sequelize');
// var sequelize = new Sequelize('mysql://root@127.0.0.1/readup',, {});
var sequelize = new Sequelize('readup', 'root', '', {
  host: "127.0.0.1",
})

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull:false // what does this even mean?
  },
  email: Sequelize.STRING,
  karma: Sequelize.INTEGER,
  github_id: Sequelize.INTEGER,
  image_url: Sequelize.STRING,
  profile_url: Sequelize.STRING,
  public_repos: Sequelize.INTEGER,
  gh_followers: Sequelize.INTEGER
});

var Item = sequelize.define('Item', {
  title: Sequelize.STRING,
  link: Sequelize.STRING
});

var Tag = sequelize.define('Tag', {
  name: Sequelize.STRING
});

var Vote = sequelize.define('Vote', {
  value: Sequelize.INTEGER
});

User.hasMany(Item);
User.hasMany(Vote);
Item.hasMany(Vote);
Item.hasMany(Tag);
Tag.hasMany(Item);

Item.belongsTo(User);
Vote.belongsTo(User);
Vote.belongsTo(Item);

User.sync();
Item.sync();
Tag.sync();
Vote.sync();

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Item = Item;
module.exports.Tag = Tag;
module.exports.Vote = Vote;