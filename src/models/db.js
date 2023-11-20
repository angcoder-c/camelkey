import sqlite3 from 'sqlite3';
import fs from 'fs'
import {sqlFileData, formatDataValues, formatFilters, dbExists, uri} from '../utils/funcs.js'

export class DB {
    constructor ({
        name,
        masterPassword,
        description,
        directory
    }) {
        this.name = name;
        this.masterPassword = JSON.stringify(masterPassword || '');
        this.description = JSON.stringify(description || '');
        this.uri = uri(this.name, directory);

        var sentence = `
            INSERT INTO "DB" 
            (name, masterPassword, description) 
            VALUES (
            ${JSON.stringify(this.name)}, 
            ${this.masterPassword}, 
            ${this.description}
        );`;
        var dbexists = dbExists(this.uri)

        // create database
        this.database = new sqlite3.Database(this.uri, (err) => {
            if (err) process.exit(1)
            
            // if not exists create tables and register db info
            if (!dbexists) {
                this.database.exec(sqlFileData('schema'));
                this.database.exec(sentence);
            }
        });
    }

    insert({
        table,
        data
    }){
        var fiedls = Object.keys(data).toString();
        var values = formatDataValues(
            Object.values(data)
        );
        var sentence = `INSERT INTO "${table}" (${fiedls}) VALUES (${values});`;
        this.database.exec(sentence, err => {});
    }

    query_all({
        table,
        fields,
        cb
    }){
        var sentence = `SELECT ${fields.toString()} FROM "${table}";`;
        this.database.all(sentence, (err, rows) => cb(rows) );
    }

    query_filter_by({
        table,
        filters,
        cb
    }) {

        /*
            filters : {
                field : {
                    value : value( number, string, null),
                    operator : string (>= <= == != )
                }
            }
        */
        var fts = formatFilters({
            data : filters, 
            table : table
        });

        var sentence = `SELECT * FROM "${ table }" WHERE ${ fts };`;
        this.database.all(sentence, (err, rows) => cb(rows) );
    }

    query_filter_by_first({
        table,
        filters,
        cb
    }){
        var fts = formatFilters({
            data : filters, 
            table : table
        });
        var sentence = `SELECT * FROM "${ table }" WHERE ${ fts };`;
        this.database.get(sentence, (err, rows) => cb(rows) );
    }

    update_by_id({
        id,
        table,
        field,
        value
    }){
        var value = JSON.stringify(value);
        var sentence = `UPDATE "${ table }" SET ${field}=${ value } WHERE id=${id};`;
        this.database.exec(sentence);
    }

    delete({
        table,
        filters,
    }){
        var fts = formatFilters({
            data : filters, 
            table : table
        });
        var sentence = `SELECT * FROM "${table}" WHERE ${ fts };`;
        this.database.get(sentence, (err, rows) => {
            if (!rows) return undefined;
            this.database.run(`DELETE FROM "${table}" WHERE id=${rows.id}`);
        });
    }

    validatePasswordDB ({
        password='',
        cb = row=>{}
    }) {
        var sentence = `SELECT * FROM "DB";`;
        this.database.all(sentence, (err, rows) => {
            if (rows[0]?.masterPassword===password) cb(rows[0])
        });
    }

    close(){
        this.database.close()
    }
}