var Q = require('q');
var phantom = require('node-phantom');

var valDeferred;

var validatePhantom = function(link) {
  phantom.create(function(err,ph) {
    ph.createPage(function(err,page) {
      page.open(link, function(err, status) {
        if (err === null && status==="success") {
          valDeferred.resolve(true);
        } else {
          valDeferred.resolve(false);
        }
      });
    });
  });
};

exports.validateURL = function(req, res, callback) {
  valDeferred = Q.defer();
  validatePhantom(req.body.link);
  valDeferred.promise.then(function(validURL){
    if (validURL) {
      callback(req,res);
    } else {
      res.send('link validation error');
    }
  });  
};