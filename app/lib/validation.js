var Q = require('q');
var request = require('request');

var valDeferred;

var validateRequest = function(link) {
  request(link, function(error, response) {
    if (!error && response.statusCode === 200) {
      valDeferred.resolve(true);
    } else {
      valDeferred.resolve(false);
    }
  });
};

exports.validateURL = function(req, res, callback) {
  valDeferred = Q.defer();
  validateRequest(req.body.link);
  valDeferred.promise.then(function(validURL){
    if (validURL) {
      callback(req,res);
    } else {
      res.send('link validation error');
    }
  });  
};