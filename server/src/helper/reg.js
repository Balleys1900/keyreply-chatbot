function regexFromString(string) {
  var match = /^\/(.*)\/([a-z]*)$/.exec(string);
  return new RegExp(match[1], match[2]);
}

exports.regexFromString = regexFromString;
