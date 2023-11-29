import { currentDB } from '../commands.js';
import { factory } from '../utils/commands/config.js';
import { dbExists, uri } from '../utils/funcs.js';
import { Shell } from '../shell.js';
import {
    createDatabase,
    showDatabases,
    showCurrentDatabase,
    deleteDatabase
}
from '../controllers/db.controller.js';
import { DB } from '../models/db.js';

export function createDatabaseCommand () {
    const program = factory('create');

    program
    .description('create a new database')
    .command('database')
    .description('specifies the properties of the database to be created')
    .requiredOption('-n, --name <name>', 'database creation name')
    .option('-d, --description <description>', 'database description', '')
    .requiredOption('-p, --password <password>', 'database master password')
    .option('--to <directory>', 'directory to create the database')
    .option('--local', 'use the local directory to create database')
    .action((options, command) => {        
        let directory = (
            options.local ? 
            undefined : 
            (options.to || undefined)
        );

        createDatabase({
            name : options.name, 
            masterPassword : options.password, 
            description : options.description,
            directory : directory
        });
        command.setOptionValueWithSource('to', undefined)
        command.setOptionValueWithSource('local', undefined)
    });

    return program;
}

export function showDatabasesCommand () {
    const program = factory('show');
    
    program
    .description('display information about the entity in general or about a particular record')
    .command('databases')
    .description('shows all databases created')
    .action(options => {
        showDatabases();
    })

    return program;
}

export function showCurrentDatabaseCommand () {
    const program = factory('database');
    
    program
    .description('display current database information')
    .option('-p, --password <password>', 'database master password')
    .action(async (options, command) => {
        showCurrentDatabase(currentDB.uri, options.password)
        command.setOptionValueWithSource('password', undefined)
    });
    
    return program;
}

export function deleteDatabaseCommand () {
    const program = factory('database');
    
    program
    .description('specifies the credentials of the database you want to open')
    .action(async options => {
        deleteDatabase(currentDB.uri)
    });

    return program;
}

export function openDatabaseCommand (camelkey) {
    const program = factory('open');
    
    program
    .description('open database manager mode')
    .requiredOption('-db, --database <name>', 'name of the database to be opened')
    .requiredOption('-p, --password <password>', 'database master password')
    .option('--to <directory>', 'directory to create the database')
    .option('--local', 'use the local directory to create database')
    .action(async (options, command) => {
        let name = options.database;
        let password = options.password;
        let directory = (
            options.local ? 
            undefined : 
            (options.to || undefined)
        );
        let dburi = uri(name, directory)
        if (!dbExists(dburi)) return undefined;
        currentDB.uri = dburi;
        
        const db = new DB({ directory : dburi })
        
        db.validatePasswordDB({
            password : password,
            cb : row => {
                const sh = new Shell(camelkey);
                sh.run()
            }
        });

        command.setOptionValueWithSource('to', undefined)
        command.setOptionValueWithSource('local', undefined)
    })

    return program;
}