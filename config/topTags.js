var permutations = {
  '-' : '-',
  '.' : '.',
  ' ' : ' ',
  ''  : ''
};
var specialTags = {
  'js' : 'javascript'
};

var addSpecialTags = function(resultTags) {
  for (var each in specialTags) {
    resultTags[each] = specialTags[each];
  }
};

var createPermutations = function(cleanJSTag) {
  var results = [];
  for (var perm in permutations) {
    results.push(cleanJSTag+perm+'js');
  }
  return results;
};

var makeDashesSpaces = function(multiWordTag, resultTags) {
  var tagWithSpaces = multiWordTag.replace(/-/g,' ');
  resultTags[tagWithSpaces] = multiWordTag;
  resultTags[multiWordTag] = multiWordTag;
};

var makeJSclean = function(jsTag, resultTags) {
  var cleanJSTag = jsTag.replace(/[. -]*(js)$/,'');
  resultTags[cleanJSTag] = cleanJSTag+'js';
  var permutations = createPermutations(cleanJSTag);
  for (var i = 0; i < permutations.length; i++) {
    resultTags[permutations[i]] = cleanJSTag+'js';
  }
};



exports.cleanTopTagArr = function(topTagArr) {
  var resultTags = {};
  addSpecialTags(resultTags);
  for (var tag = 0; tag < topTagArr.length; tag++) {
    var tagName = topTagArr[tag].name;
    if (tagName.match(/(js)$/)) {
      makeJSclean(tagName, resultTags);
    }else if(tagName.indexOf('-') !== -1) {
      makeDashesSpaces(tagName, resultTags);
    }else{
      resultTags[tagName] = tagName;
    }
  }
  return resultTags;
};

