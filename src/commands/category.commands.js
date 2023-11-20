import { currentDB } from '../commands.js';
import { factory } from '../utils/commands/config.js';
import {
    createCategory,
    deleteCategory,
    showCategories,
    showCategory
} from '../controllers/category.controller.js';
import { Category } from '../models/category.js';

export function createCategoryCommand() {
    const program = factory('category');
    
    program
    .description('define a new category to organize the entries')
    .requiredOption('-n, --name <name>', 'name of the new category')
    .action(options => {
        createCategory(currentDB.uri, options)
    })

    return program
}

export function showCategoriesCommand() {
    const program = factory('categories');
    
    program
    .description('show all categories')
    .action(options => {
        showCategories(currentDB.uri);
    })

    return program
}

export function showCategoryCommand() {
    const program = factory('category');
    
    program
    .description('shows the category of the specified identifier')
    .requiredOption('--id <id>', 'category identifier')
    .action(options => {
        showCategory(currentDB.uri, options.id);
    })

    return program
}

export function deleteCategoryCommand() {
    const program = factory('category');
    
    program
    .description('delete a specific category')
    .requiredOption('--id <id>', 'category identifier')
    .action(options => {
        deleteCategory(currentDB.uri, options.id);
        showCategory(currentDB.uri, options.id)
    })
    
    return program
}