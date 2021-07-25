"use strict";

Object.defineProperty(exports, '_esModule', {
  value: true
});

var e = {
  resolveName(name) {
    return e.resolveString(name)
    .trim()
    .replace(e.RESOLVE_NAME_REGEX, '');
  },
  resolveString(strLike) {
    return String(strLike);
  },
  
  RESOLVE_NAME_REGEX: /[^\w\s -]/gi
};

module.exports = e;