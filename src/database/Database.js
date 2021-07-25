"use strict";

Object.defineProperty(exports, '_esModule', {
  value: true
});

var { resolveName, resolveString } = require('../util/DataResolver');
var { DefaultDatabaseType } = require('../util/Constants');
var { GenerateRandomString, JsonParse, JsonStrgify } = require('../util');
var { TypeError } = require('../Errors');
var FileHandle  = require('./FileHandle');

var { createReadStream } = require('fs');
var _ = require('./lodash');

var databases = [];

function Database() {
  return Database.init.apply({}, arguments);
}

Database.init = function init(...args) {
  var [name = GenerateRandomString({length:10})] = args;
  
  for(var key in Database.init.prototype) {
    Object.defineProperty(this, key, {
      value: Database.init.prototype[key]
    });
  }
  
  this.name = resolveName(name);
  this.Database = Database;
  this.type = DefaultDatabaseType;
  this._cache = {};
  this.cacheReady = false;
  
  /* Methods */
  
  this.validateIndex = function validateIndex() {
    return this.type === 'CHILD' ? `${this.ChildName}.db` : 'index.db'
  }
  this.path = function path() {
    return `./lldb/${this.name}/${this.validateIndex()}`
  }
  this.all = async function all(callback) {
    if(!this.FileHandle) this.FileHandle = FileHandle(this.path());
    console.log(this.FileHandle)

    var read = await this.FileHandle.read();
    var json = JsonParse(read);
    
    if(JsonStrgify(json)!==JsonStrgify(this._cache)) {
      this.cacheReady = true;
      this._cache = json;
    }
    
    if(callback) await callback(json);
    
    return json;
  }   
  this.get = async function get(key, callback) {
    if(!this.cacheReady) this.all();
    
    var got = _.get(this._cache, key);
    
    if(callback) await callback(got);
    return got;
  }
  this.set = async function set(key, value, callback) {
    if(!this.FileHandle) this.FileHandle = FileHandle(this.path());
    var err;
    
    _.set(this._cache, key, value);
    
    this.FileHandle.write(JsonStrgify(this._cache));
    
    return callback(err);
  }

  databases.push(this)
  return this;
}

Database.init.prototype.databases = databases;

var database = Database('main');
database.version = require('../../package')['version'];

Object.defineProperty(process, 'db', {
  value: database
});

module.exports = database;