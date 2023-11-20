import { DB } from '../models/db.js'
import { Group } from '../models/groups.js'
import { Display } from "../models/tables.js";
import { dbExists } from "../utils/funcs.js";

export async function createGroup(uri, data) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    var group = new Group(data);
    group.save(db)
}


export async function showGroups(uri, category) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });

    Group.getAll(db, category, {}, (rows) => {
        new Display(rows).show();
    });
}

export async function showGroup(uri, id) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });
    
    Group.getById(db, id, {}, (row) => {
        new Display([row].filter(r => r), false, true).show();
    });
}

export async function updateNotes(uri, id, notes) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });
    Group.updateNotesById(db, id, notes);
}

export async function deleteGroup(uri, id) {
    if (!dbExists(uri)) return undefined;

    var db = new DB({ directory : uri });
    Group.deleteById(db, id);
}