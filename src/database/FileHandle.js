var { createReadStream, createWriteStream } = require('fs');

function FileHandle(...args) {
  return FileHandle.init.call({}, ...args);
}

FileHandle.init = function init(path) {
  this.path = path;
  this.read = function read() {
    return new Promise(resolve => {
        var data = String();
        var stream = createReadStream(this.path);
    
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => resolve(data));
    });
    
  }
  this.write = function write(data) {
    return new Promise(async resolve => {
      var stream = createWriteStream(this.path);
      
      await stream.write(data);
      
      stream.end();
      
      resolve(void 0);
    });
  }
  
  return this;
};

module.exports = FileHandle;