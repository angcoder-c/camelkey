import { Command } from 'commander';
import { factory } from './utils/commands/config.js';
import { 
    createDatabaseCommand, 
    deleteDatabaseCommand,
    showDatabasesCommand,
    showCurrentDatabaseCommand,
    openDatabaseCommand
} from './commands/db.commands.js';
import { 
    createEntryCommand,
    deleteEntryCommand,
    showEntriesCommand,
    showEntryCommand,
    updateNotesEntryCommand,
    updatePasswordEntryCommand,
    updateTitleEntryCommand,
    updateURLEntryCommand,
    updateUserEntryCommand
} from './commands/entry.commands.js';
import { 
    createGroupCommand,
    deleteGroupCommand,
    showGroupCommand,
    showGroupsCommand,
    updateNotesGroupCommand
} from './commands/group.commands.js';
import {
    createCategoryCommand,
    deleteCategoryCommand,
    showCategoriesCommand,
    showCategoryCommand
} from './commands/category.commands.js';

export const external = factory()
    .version('0.0.1')
    .description('CLI Password Manager')

const main = factory()
    .version('0.0.1')
    .description('CLI Password Manager')

// current database general information
export let currentDB = {
    uri: undefined
};

// General Commands

const create = main
    .command('create')
    .description('creates a new record of the specified entity')
    .allowExcessArguments(false)
    .showSuggestionAfterError(true)
    .exitOverride();

const show = main
    .command('show')
    .description('display information about the entity in general or about a particular record')
    .allowExcessArguments(false)
    .showSuggestionAfterError(true)
    .exitOverride();

const update = main
    .command('update')
    .description('update a specific field of a specific record')
    .allowExcessArguments(false)
    .showSuggestionAfterError(true)
    .exitOverride();

const del = main
    .command('delete')
    .description('deletes a record of the specified entity')
    .allowExcessArguments(false)
    .showSuggestionAfterError(true)
    .exitOverride();

// DB Commands
del.addCommand(deleteDatabaseCommand())
show.addCommand(showCurrentDatabaseCommand())

// Category Commands
create.addCommand(createCategoryCommand())
del.addCommand(deleteCategoryCommand())
show.addCommand(showCategoriesCommand())
show.addCommand(showCategoryCommand())

// Group Commands
create.addCommand(createGroupCommand())
del.addCommand(deleteGroupCommand())
show.addCommand(showGroupsCommand())
show.addCommand(showGroupCommand())
update
.command('group')
.description('update group fields')
.addCommand(updateNotesGroupCommand())

// Entry Commands
create.addCommand(createEntryCommand())
del.addCommand(deleteEntryCommand())
show.addCommand(showEntriesCommand())
show.addCommand(showEntryCommand())
update
.command('entry')
.description('update entry fields')
.addCommand(updateTitleEntryCommand())
.addCommand(updatePasswordEntryCommand())
.addCommand(updateUserEntryCommand())
.addCommand(updateNotesEntryCommand())
.addCommand(updateURLEntryCommand())

// external commands
external.addCommand(openDatabaseCommand(main));
external.addCommand(createDatabaseCommand());
external.addCommand(showDatabasesCommand());