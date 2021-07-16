const BaseManager = require('./BaseManager');
const fs = require('fs');

class FileHandle extends BaseManager {
  constructor(path, database) {
    super(database);
    
    this.path = path;
    this.read = fs.readFileSync.bind(this, this.path);
    this.write = fs.writeFileSync.bind(this, this.path);
    
  }
}

module.exports = FileHandle;