const BaseDatabase = require('./BaseDatabase');
const DatabasePathManager = require('../Managers/DatabasePathManager');
const FileHandle = require('../Managers/FileHandle.js');

const fs = require('fs');
const FsPromises = fs.promises;

class Database extends BaseDatabase {
    constructor(...args) {
        super(...args);

        this.Database = Database;

        this.Child = class Child extends Database {
            constructor() {
                throw new Error('This class is not done.');
            }
        };

        this.type = this instanceof this.Child ? 'child' : 'main';

        this.PathManager = new DatabasePathManager(this);


        this.FileHandle = new FileHandle(this.PathManager.DATABASE_PATH, this);
    }

    set(e) {

    }

    get() {

    }
}

module.exports = new Database('main');