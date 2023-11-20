import { currentDB } from '../commands.js';
import { factory } from '../utils/commands/config.js';
import { Command } from 'commander';
import {
    createEntry,
    deleteEntry,
    showEntries,
    showEntry,
    showEntriesInCategory,
    showEntriesInGroup,
    showLastEntries,
    showFirstEntries,
    updateTitle,
    updatePassword,
    updateUser,
    updateURL
} from '../controllers/entry.controller.js';
import { Display } from '../models/tables.js';

export function createEntryCommand() {
    const program = factory('entry')
    
    program
    .description('defines a new credential to save in the database')
    .requiredOption('-t, --title <title>', 'title of the new entry')
    .requiredOption('-u, --user <username>', 'username for new entry')
    .requiredOption('-p, --password <password>', 'password for new entry')
    .option('--url <url>', 'URL related to credentials')
    .option('--notes <notes>', 'notes on credentials to save')
    .option('-c, --category <category>', 'category to which the entry to be saved will belong')
    .option('-g, --group <group>', 'group to which the entry to be saved belongs. has priority over the category')
    .action((options, command) => {
        options['categoryName'] = options.category;
        options['groupName'] = options.group;

        createEntry(currentDB.uri, options);

        setTimeout(
            () => {
                if (options.categoryName & options.categoryName) {
                    showEntriesInGroup(currentDB.uri, options.groupName)
                } else if (options.categoryName) {
                    showEntriesInCategory(currentDB.uri, options.categoryName)
                } else {
                    showEntries(currentDB.uri)
                }
            },
            5
        )

        command.setOptionValueWithSource('category', undefined)
        command.setOptionValueWithSource('group', undefined)
        command.setOptionValueWithSource('url', undefined)
        command.setOptionValueWithSource('notes', undefined)
    })

    return program
}

function findEntriesCommand() {
    const program = factory('find')
    
    program
    .description('searches the indicated range of entries')
    .option('--last <n>', 'show last n entries')
    .option('--first <n>', 'show first n entries')
    .action((options, command) => {
        if (options.last) {
            showLastEntries(currentDB.uri, options.last)
        } 
            
        if (options.first) {
            showFirstEntries(currentDB.uri, options.first)
        } 
            
        if (
            options.first === undefined & 
            options.last === undefined
        ) {
            showEntries(currentDB.uri);
        }

        command.setOptionValueWithSource('last', undefined)
        command.setOptionValueWithSource('first', undefined)
    })

    return program
}

export function showEntriesCommand() {
    const program = factory('entries')
    
    program
    .description('shows all registered entries')
    .option('-c, --category <category>', 'category to which the entry belongs')
    .option('-g, --group <group>', 'group to which the entry belongs. has search priority lower than the category')
    .action((options, command) => {
        if (options.category) {
            showEntriesInCategory(currentDB.uri, options.category)
        } else if (options.group) {
            showEntriesInGroup(currentDB.uri, options.group)
        } else {
            showEntries(currentDB.uri)
        }
            
        command.setOptionValueWithSource('category', undefined)
        command.setOptionValueWithSource('group', undefined)
    }) 

    return program.addCommand(findEntriesCommand())
}

export function showEntryCommand() {
    const program = factory('entry')
    
    program
    .description('shows the entry indicated by the identifier')
    .requiredOption('--id <id>', 'entry identifier')
    .action(options => {
        showEntry(currentDB.uri, options.id);
    })

    return program
}

export function deleteEntryCommand() {
    const program = factory('entry')
    
    program
    .description('delete a specific entry')
    .requiredOption('--id <id>', 'entry identifier')
    .action(options => {
        showEntry(currentDB.uri, options.id);
        setTimeout(
            ()=>deleteEntry(currentDB.uri, options.id),
            0.1
        );
    })

    return program
}

export function updateTitleEntryCommand() {
    const program = factory('title')
    
    program
    .description('update the title registered in the specified entry')
    .requiredOption('--id <id>', 'entry identifier')
    .argument('<title>', 'updated title for entry')
    .action((title, options) => {
        updateTitle(currentDB.uri, options.id, title);
        setTimeout(
            ()=>showEntry(currentDB.uri, options.id),
            0.1
        );
    })

    return program
}

export function updatePasswordEntryCommand() {
    const program = factory('password')
    
    program
    .description('updates the password registered in the specified entry')
    .requiredOption('--id <id>', 'entry identifier')
    .argument('<password>', 'updated password for entry')
    .action((password, options) => {
        updatePassword(currentDB.uri, options.id, password);
        setTimeout(
            ()=>showEntry(currentDB.uri, options.id),
            0.1
        );
    })

    return program
}

export function updateUserEntryCommand() {
    const program = factory('user1')
    
    program
    .description('updates the user registered in the specified entry')
    .requiredOption('--id <id>', 'entry identifier')
    .argument('<user>', 'updated user for entry')
    .action((user, options) => {
        updateUser(currentDB.uri, options.id, user);
        setTimeout(
            ()=>showEntry(currentDB.uri, options.id),
            0.1
        );
    })

    return program
}

export function updateNotesEntryCommand() {
    const program = factory('notes')
    
    program
    .description('updates the notes registered in the specified entry')
    .requiredOption('--id <id>', 'entry identifier')
    .argument('<notes>', 'updated notes for entry')
    .action((notes, options) => {
        updateNotes(currentDB.uri, options.id, notes);
        setTimeout(
            ()=>showEntry(currentDB.uri, options.id),
            0.1
        );
    })

    return program
}

export function updateURLEntryCommand() {
    const program = factory('url')
    
    program
    .description('updates the url registered in the specified entry')
    .requiredOption('--id <id>', 'entry identifier')
    .argument('<url>', 'updated url for entry')
    .action((url, options) => {
        updateURL(currentDB.uri, options.id, url);
        setTimeout(
            ()=>showEntry(currentDB.uri, options.id),
            0.1
        );
    })

    return program
}