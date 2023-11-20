import { DB } from '../models/db.js'
import { dbExists, uri } from '../utils/funcs.js'
import { red, green } from "../utils/colors.js"
import { LocalDB } from "../db.js"
import fs from 'fs'
import { Display } from "../models/tables.js"

export async function createDatabase(database = {}) {

    /**
     * database : object 
     *      name : string
     *      masterPassword : string
     *      description : string,
     *      directory : string
     */
    try {
        new DB(database);
        if (!database.directory && !!database.name) {
            database['uri'] = uri(database.name);
            new LocalDB().insert(database);
        }
        console.log(green('Database created successfully'));
    } catch (e) {
        console.log(red('error: database already exists'))
    }
}

export async function showDatabases() {
    new LocalDB().all(rows => {
        new Display(rows).show();
    })
}

export async function showCurrentDatabase(uri, password='') {
    console.log(uri, password)
    if (!dbExists(uri)) undefined;

    var db = new DB({ directory : uri })

    db.query_all({
        table : 'DB',
        fields : ['*'],
        cb : rows => {
            const display = new Display(rows?.filter(r => r), false, true)
            display.show(rows[0].masterPassword===password ? [] : undefined);
        }
    })
}

export async function deleteDatabase(uri) {
    if (!dbExists(uri)) undefined;
        
    new LocalDB().delete(uri)
    fs.unlinkSync(uri)
    console.log('By\n')
    process.exit(0);

}