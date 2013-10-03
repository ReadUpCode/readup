
// var orm = require('orm');

// orm.connect('mysql://root@host', function(err, db){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('GOOD');
//   }
// });


exports.create = function(req, res){
  res.jsonp({'hello':'world'});
};