const BaseManager = require('./BaseManager');
const { existsSync, mkdirSync, writeFileSync } = require('fs');

class DatabasePathManager extends BaseManager {
  constructor(...args) {
    super(...args);
    
    this.DatabasePathManager = DatabasePathManager;
    this._resolve();
    
  }
  
  _resolve() {
    
    if(!existsSync(this['LL-DB_PATH'])) mkdirSync(this['LL-DB_PATH']);
    if(!existsSync(this.THIS_DB_PATH)) mkdirSync(this.THIS_DB_PATH);
    if(!existsSync(this.DB_PATH)) writeFileSync(this.DATABASE_PATH, JSON.stringify([]));
    
  }
  
  get ['LL-DB_PATH']() {
    return `./ll-db`;
  }
  
  get THIS_DB_PATH() {
    return `${this['LL-DB_PATH']}/${this.Database.name}`;
  }
  
  get DATABASE_PATH() {
    return `./${this.THIS_DB_PATH}/${this.getFile()}`;
  }
  
  getFile() {
    return this.Database.type != 'child' ? 'index.db' : `${this.Database.name}.db`;
  }
  
}

module.exports = DatabasePathManager;