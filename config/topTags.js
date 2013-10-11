var topTags = {};
var permutations = {
  '-' : '-',
  '.' : '.',
  ' ' : ' ',
  ''  : ''
};

var createPermutations = function(cleanJSTag) {
  var results = [];
  for (var perm in permutations) {
    results.push(cleanJSTag+perm+'js');
  }
  return results;
};

var makeDashesSpaces = function(multiWordTag) {
  var tagWithSpaces = multiWordTag.replace(/-/g,' ');
  topTags[tagWithSpaces] = multiWordTag;
  topTags[multiWordTag] = multiWordTag;
};

var makeJSclean = function(jsTag) {
  var cleanJSTag = jsTag.replace(/[. -]*(js)$/,'');
  topTags[cleanJSTag] = cleanJSTag+'js';
  var permutations = createPermutations(cleanJSTag);
  for (var i = 0; i < permutations.length; i++) {
    topTags[permutations[i]] = cleanJSTag+'js';
  }
};



exports.cleanTopTagArr = function(topTagArr) {
  for (var tag = 0; tag < topTagArr.length; tag++) {
    var tagName = topTagArr[tag].name;
    if (tagName.match(/(js)$/)) {
      makeJSclean(tagName);
    }else if(tagName.indexOf('-') !== -1) {
      makeDashesSpaces(tagName);
    }else{
      topTags[tagName] = tagName;
    }
  }
  return topTags;
};

