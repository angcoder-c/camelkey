import sqlite3 from 'sqlite3';
import { dbExists, uri, sqlFileData } from './utils/funcs.js';

export class LocalDB {
    constructor() {
        this._mainDBDir = `${process.cwd()}/db/local`;
        this.uri = uri('main', this._mainDBDir)
        let dbexists = dbExists(this.uri)

        this.database = new sqlite3.Database(this.uri, (err) => {
            if (err) process.exit(1)
            // if not exists create tables
            if (!dbexists) {
                this.database.exec(sqlFileData('local_schema'));
            }
        });
    }

    insert({
        name,
        masterPassword,
        description,
        directory
    }) {
        let db_uri = uri(name, directory)
        name = JSON.stringify(name)
        masterPassword = JSON.stringify(masterPassword || '');
        description = JSON.stringify(description || '');

        let sentence = `INSERT INTO "DB" (name, masterPassword, description, uri) VALUES (
            ${name}, ${masterPassword}, ${description}, "${db_uri}"
        );`;
        this.database.exec(sentence, (err) => {})
    }

    all (cb = (rows)=>{}) {

        let sentence = `SELECT * FROM "DB";`;
        this.database.all(sentence, (err, rows) => cb(rows))
    }

    delete (uri) {
        let sentence = `DELETE FROM "DB" WHERE uri="${uri}"`
        this.database.exec(sentence, err=>{});
    }
}