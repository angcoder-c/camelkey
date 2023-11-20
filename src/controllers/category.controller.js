import { DB } from '../models/db.js'
import { Category } from '../models/category.js'
import { Display } from "../models/tables.js";
import { dbExists } from "../utils/funcs.js";

export async function createCategory(uri, data) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });
    var category = new Category(data);
    category.save(db);
    
    Category.getAll(db, {}, (rows, args)=>{
        rows?.map(row=>( 
            row.name===category.name ? 
            showCategory(uri, row.id) : 
            undefined
        ))
    })
}

export async function showCategories(uri) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Category.getAll(db, {}, (rows, args) => {
        new Display(rows).show();
    });
}

export async function showCategory(uri, id) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Category.getById(db, id, {}, (row, args) => {
        new Display([row].filter(r => r), false, true).show();
    })
}

export async function deleteCategory(uri, id) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Category.deleteById(db, id);
}