class BaseDatabase {
  constructor(name) {
    
    this.name = name;
    this.BaseDatabase = BaseDatabase;
    this._data = [];
    
  }
}

module.exports = BaseDatabase;