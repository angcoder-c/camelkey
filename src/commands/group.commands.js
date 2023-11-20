import { currentDB } from '../commands.js';
import { factory } from '../utils/commands/config.js';
import {
    createGroup,
    deleteGroup,
    showGroup,
    showGroups,
    updateNotes
} from '../controllers/group.constroller.js';

export function createGroupCommand() {
    const program = factory('group');

    program
    .description('define a new group to organize credentials')
    .requiredOption('-n, --name <name>', 'name of the new group')
    .option('--notes <notes>', 'notes on the credentials group')
    .requiredOption('-c, --category <category>', 'category to which the new group belongs')
    .action((options, command) => {
        createGroup(currentDB.uri, options);
        setTimeout(
            () => showGroups(currentDB.uri, options.category), 
            5
        )
        command.setOptionValueWithSource('notes', undefined)
    })

    return program;
}

export function showGroupsCommand() {
    const program = factory('groups');

    program
    .description('show all groups')
    .requiredOption('-c, --category <category>', 'category to which the group belongs')
    .action(options => {
        showGroups(currentDB.uri, options.category);
    })
    
    return program;
}

export function showGroupCommand() {
    const program = factory('group');

    program
    .description('shows the group of the specified identifier')
    .requiredOption('--id <id>', 'category identifier')
    .action(options => {
        showGroup(currentDB.uri, options.id);
    })

    return program;
}

export function deleteGroupCommand() {
    const program = factory('group');

    program
    .description('delete a specific group')
    .requiredOption('--id <id>', 'group identifier')
    .action(options => {
        deleteGroup(currentDB.uri, options.id);
        showGroup(currentDB.uri, options.id)
    })
    
    return program;
}

export function updateNotesGroupCommand() {
    const program = factory('notes');

    program
    .description('update group notes')
    .requiredOption('--id <id>', 'group identifier')
    .argument('<notes>', 'group notes')
    .action((notes, options) => {
        updateNotes(currentDB.uri, options.id, notes);
        setTimeout(
            ()=>showGroup(currentDB.uri, options.id),
            0.1
        );
    })
    
    return program;
}