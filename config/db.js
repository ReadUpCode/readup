var environConfig = require('./environConfig');
var Sequelize  = require('sequelize');

var sequelize = new Sequelize(
  environConfig.MYSQL_DATABASE,
  environConfig.MYSQL_USERNAME,
  environConfig.MYSQL_PASSWORD,
  {
    host: environConfig.MYSQL_HOST
  }
);

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

var Category = sequelize.define('Category', {
  name: Sequelize.STRING
});

User.hasMany(Item);
User.hasMany(Vote);
Item.hasMany(Vote);
Item.hasMany(Tag);
Item.hasMany(Category);
Category.hasMany(Item);
Tag.hasMany(Item);
Tag.hasMany(Vote);

Item.belongsTo(User);
Vote.belongsTo(User);
Vote.belongsTo(Item);
Vote.belongsTo(Tag);

User.sync();
Item.sync();
Tag.sync();
Vote.sync();
Category.sync();

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Item = Item;
module.exports.Tag = Tag;
module.exports.Vote = Vote;
module.exports.Category = Category;
