var posts = require('../app/controllers/posts');

module.exports = function(app){
  app.post('/posts', posts.create);
};