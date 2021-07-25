"use strict";

Object.defineProperty(exports, '_esModule', {
  value: true
});

var u = {
  GenerateRandomString(cfg = {}) {
    var {
      length = u.RandomInt(5, 10),
      chars = "abcdefghijklmnopqrstuvwxyz123456789_-"
    } = cfg;
    
    var string = String();
    
    for(var i = 0; i < length; i++) {
      string += chars[u.RandomInt(0, chars.length)];
    }
    
    return string;
  },
  
  RandomInt(min = 0, max = 1) {
    return parseInt(Math.random() * max) + min;
  },
  
  JsonParse(data = "{}") {
    var d;
    try {
      d = JSON.parse(data);
    } catch(err) {
      d = {};
    }
    
    return d;
  },
  
  JsonStrgify(data = {}) {
    var d;
    try {
      d = JSON.stringify(data);
    } catch(e) {
      d = "{}";
    }
    
    return d;
  }
};

module.exports = u;